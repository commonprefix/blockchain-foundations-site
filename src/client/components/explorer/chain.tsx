import {
  Box,
  Button,
  Code,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { trpc } from 'client/trpc';
import { Id } from 'common/id';
import { useMemo, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useWindowSize } from 'usehooks-ts';

import { BlockComponent } from './block';

const LIMIT = 50;

export interface ChainComponentProps {
  chainTipBlockId: string;
}

export function ChainComponent({ chainTipBlockId }: ChainComponentProps) {
  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage
  } = trpc.blocks.getChain.useInfiniteQuery(
    {
      limit: LIMIT,
      chainTipBlockId
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      getPreviousPageParam: (firstPage) => firstPage.previousCursor,
      refetchOnWindowFocus: false
    }
  );

  const [blockId, setBlockId] = useState<Id>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const tree = useMemo(
    () =>
      data
        ? data.pages
            .map((page) => page.tree)
            .reduce(function (result, current) {
              return Object.assign(result, current);
            }, {})
        : {},
    [data]
  );
  const sortedTree = Object.entries(tree)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .reverse();

  const [firstItemIndex, setFirstItemIndex] = useState(1000000);

  const loadPrevious = async () => {
    if (!hasPreviousPage) return;
    await fetchPreviousPage();
    setFirstItemIndex(firstItemIndex - LIMIT);
  };

  const loadNext = async () => {
    if (!hasNextPage) return;
    await fetchNextPage();
  };

  const { height: windowHeight } = useWindowSize();

  return (
    <>
      <Virtuoso
        style={{ height: windowHeight - 66 }}
        firstItemIndex={firstItemIndex}
        initialTopMostItemIndex={LIMIT - 1}
        data={sortedTree}
        startReached={loadPrevious}
        endReached={loadNext}
        itemContent={(index, [key, tree]) => {
          const height = parseInt(key);
          const block = tree[0];
          const dateString = new Date(block.created * 1000).toLocaleString();
          return (
            <Box px={4}>
              {height}.{' '}
              <Code>
                <Button
                  variant="link"
                  fontFamily="inherit"
                  color="inherit"
                  fontWeight="inherit"
                  fontSize="inherit"
                  userSelect="auto"
                  onClick={() => {
                    setBlockId(block.id);
                    onOpen();
                  }}
                >
                  {block.id}
                </Button>
              </Code>{' '}
              (Created at: {dateString}, Miner: {block.miner},{' '}
              {block.txids.length} txs)
            </Box>
          );
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="3xl">
        <ModalOverlay />
        {blockId && (
          <ModalContent>
            <ModalHeader>Block Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <BlockComponent id={blockId} />
            </ModalBody>
          </ModalContent>
        )}
      </Modal>
    </>
  );
}
