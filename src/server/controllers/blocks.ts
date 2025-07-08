import { TRPCClientError } from '@trpc/client';
import { Block } from 'common/block';
import { Id } from 'common/id';
import { BlockModel, blockToDoc, docToBlock } from 'server/models/block';

export async function createBlock(block: Block): Promise<Block> {
  const doc = await BlockModel.create(blockToDoc(block));
  return docToBlock(doc);
}

export async function getBlockById(id: Id): Promise<Block | null> {
  const doc = await BlockModel.findOne({ id });
  return doc ? docToBlock(doc) : null;
}

export async function getChildBlocks(id: Id): Promise<Block[]> {
  const docs = await BlockModel.find({ previd: id });
  return docs.map(docToBlock);
}

export async function getChainTip(): Promise<Block | null> {
  const [doc] = await BlockModel.find({})
    .sort({ height: -1, created: 1 })
    .limit(1);
  return doc ? docToBlock(doc) : null;
}

export async function getTree({
  minHeight,
  maxHeight
}: {
  minHeight?: number;
  maxHeight?: number;
}) {
  const docs = await BlockModel.find({
    height: { $gte: minHeight, $lt: maxHeight }
  }).sort({ height: 1 });
  const tree: Record<number, Block[]> = {};
  let isEmpty = true;
  for (const doc of docs) {
    const height = doc.height;
    if (!tree[height]) tree[height] = [];
    tree[height].push(docToBlock(doc));
    isEmpty = false;
  }
  return { tree, isEmpty };
}

interface AggregationBlock extends Block {
  _id?: string;
  __v?: number;
  depth?: number;
}

export async function getChain(id: Id, limit: number) {
  const [res] = await BlockModel.aggregate<{
    _id: string;
    chain: AggregationBlock[];
  }>([
    { $match: { id: id } },
    {
      $graphLookup: {
        from: 'blocks',
        startWith: '$previd',
        connectFromField: 'previd',
        connectToField: 'id',
        as: 'chain',
        maxDepth: limit,
        depthField: 'depth'
      }
    },
    { $unwind: '$chain' },
    { $sort: { 'chain.depth': 1 } },
    {
      $group: {
        _id: '$_id',
        chain: { $push: '$chain' }
      }
    }
  ]);
  const block = await BlockModel.findById(res?._id);
  if (!block) throw new TRPCClientError('Block not found');
  const blocks = res?.chain ?? [];
  const tree: Record<number, Block[]> = {};
  let isEmpty = true;
  for (const doc of [...blocks, docToBlock(block) as AggregationBlock]) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, __v, depth, ...block } = doc;
    const height = block.height;
    if (!tree[height]) tree[height] = [];
    tree[height].push(block);
    isEmpty = false;
  }
  return { tree, isEmpty };
}
