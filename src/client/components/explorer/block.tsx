import { HStack, Link, Stack } from '@chakra-ui/react';
import { trpc } from 'client/trpc';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { BlockLink, TransactionLink } from './objectLink';

dayjs.extend(relativeTime);

export interface BlockComponentProps {
  id: string;
  hideLinks?: boolean;
}

export function BlockComponent({ id, hideLinks }: BlockComponentProps) {
  const { data: block } = trpc.blocks.getById.useQuery(id);
  const { data: childBlocks } = trpc.blocks.getChildren.useQuery(id);

  if (!block) return null;

  const dateString = new Date(block.created * 1000).toLocaleString();

  return (
    <ul>
      <li>
        <strong>Block ID</strong>: {block.id}
      </li>
      <li>
        <strong>Target</strong>: {block.T}
      </li>
      <li>
        <strong>Nonce</strong>: {block.nonce}
      </li>
      <li>
        <strong>Miner</strong>: {block.miner}
      </li>
      <li>
        <strong>Created</strong>: {dayjs.unix(block.created).fromNow()} (
        {dateString}) at UNIX timestamp {block.created}{' '}
      </li>
      <li>
        <strong>Note</strong>: {block.note}
      </li>
      {!hideLinks && (
        <>
          <li>
            <strong>Parent block</strong>:{' '}
            {block.previd === null ? (
              <strong>None. Genesis block.</strong>
            ) : (
              <BlockLink id={block.previd} />
            )}
          </li>
          <HStack spacing={1} align="start">
            <li>
              <strong>
                Child block{(childBlocks?.length ?? 0) > 1 ? 's' : ''}
              </strong>
              :
            </li>
            <Stack spacing={0}>
              {childBlocks?.map((block) => (
                <BlockLink key={block.id} id={block.id} />
              ))}
            </Stack>
          </HStack>
        </>
      )}
      <li>
        <strong>Height</strong>: {block.height} [
        <Link href={`/explorer/tree/${block.height}`}>View tree at height</Link>
        ]
      </li>
      <li>
        <strong>
          {block.txids.length} transaction{block.txids.length > 1 ? 's' : ''}
        </strong>
        :{' '}
        <ol>
          {block.txids.map((transactionId: string) => (
            <li key={transactionId}>
              <TransactionLink id={transactionId} />
            </li>
          ))}
        </ol>
      </li>
    </ul>
  );
}
