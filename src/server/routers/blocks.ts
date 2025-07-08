import { Block } from 'common/block';
import { Id } from 'common/id';
import {
  createBlock,
  getBlockById,
  getChain,
  getChainTip,
  getChildBlocks,
  getTree
} from 'server/controllers/blocks';
import {
  adminDatabaseProcedure,
  databaseProcedure
} from 'server/procedures/database';
import { z } from 'zod';

import { router } from '../trpc';

export const blocksRouter = router({
  create: adminDatabaseProcedure.input(Block).mutation(({ input }) => {
    return createBlock(input);
  }),
  getById: databaseProcedure.input(Id).query(({ input }) => {
    return getBlockById(input);
  }),
  getChildren: databaseProcedure.input(Id).query(({ input }) => {
    return getChildBlocks(input);
  }),
  getChainTip: databaseProcedure.query(() => {
    return getChainTip();
  }),
  getTree: databaseProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        chainTipHeight: z.number().min(0),
        cursor: z.number().nullish()
      })
    )
    .query(async ({ input: { limit, cursor, chainTipHeight } }) => {
      if (cursor == null) {
        cursor = chainTipHeight + 1;
      }
      const { tree, isEmpty } = await getTree({
        minHeight: cursor - limit,
        maxHeight: cursor
      });
      let nextCursor: number | undefined = cursor - limit;
      let previousCursor: number | undefined = cursor + limit;
      if (isEmpty) {
        if (nextCursor <= 0) {
          nextCursor = undefined;
        } else {
          previousCursor = undefined;
        }
      }
      return { tree, nextCursor, previousCursor };
    }),
  getChain: databaseProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        chainTipBlockId: Id,
        cursor: z.string().nullish()
      })
    )
    .query(async ({ input: { limit, cursor, chainTipBlockId } }) => {
      if (cursor == null) {
        cursor = chainTipBlockId;
      }
      const { tree, isEmpty } = await getChain(cursor, limit);
      let nextCursor: string | undefined = cursor;
      if (!isEmpty) {
        const lowestHeight = Math.min(...Object.keys(tree).map(Number));
        const lowestHeightBlock = tree[lowestHeight];
        nextCursor = lowestHeightBlock[0].id;
      }
      return { tree, nextCursor, previousCursor: null };
    })
});
