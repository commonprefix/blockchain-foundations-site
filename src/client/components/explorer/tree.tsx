import { useColorModeValue } from '@chakra-ui/color-mode';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { Stage } from '@pixi/react-pixi';
import { trpc } from 'client/trpc';
import { Block } from 'common/block';
import { Id } from 'common/id';
import { Viewport as PixiViewport } from 'pixi-viewport';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import { BlockComponent } from './block';
import { BLOCK_V_OFFSET } from './pixi/block';
import { getBounds, PixiTree } from './pixi/tree';
import { Viewport } from './viewport';

const START_Y = 0;
const LIMIT = 10;
const SCROLL_BUFFER = 100;

interface UseInfiniteLoadParams {
  tree: Record<number, Block[]>;
  viewportRef: React.RefObject<PixiViewport>;
  fetchPage: () => Promise<unknown>;
  loadCondition: ({
    topY,
    bottomY,
    viewportTopY,
    viewportBottomY
  }: {
    topY: number;
    bottomY: number;
    viewportTopY: number;
    viewportBottomY: number;
  }) => boolean;
  hasMore: boolean | undefined;
}

const useInfiniteLoad = ({
  viewportRef,
  fetchPage,
  tree,
  loadCondition,
  hasMore
}: UseInfiniteLoadParams) => {
  useEffect(() => {
    if (!hasMore) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const onDrag = async () => {
      const { topY, bottomY } = getBounds(START_Y, tree);
      const { y, height } = viewport.getVisibleBounds();
      if (
        loadCondition({
          topY,
          bottomY,
          viewportTopY: y,
          viewportBottomY: y + height
        })
      ) {
        fetchPage();
        viewport.off('moved', onDrag);
      }
    };
    viewport.on('moved', onDrag);
    return () => {
      viewport.off('moved', onDrag);
    };
  }, [viewportRef, tree, fetchPage, loadCondition, hasMore]);
};

export interface TreeComponentProps {
  tipHeight: number;
}

export function TreeComponent({ tipHeight }: TreeComponentProps) {
  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage
  } = trpc.blocks.getTree.useInfiniteQuery(
    {
      limit: LIMIT,
      chainTipHeight: tipHeight
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      getPreviousPageParam: (firstPage) => firstPage.previousCursor,
      refetchOnWindowFocus: false
    }
  );

  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const viewportRef = useRef<PixiViewport>(null);

  const width = windowWidth;
  const height = windowHeight - 66;
  const stageOptions = {
    antialias: true,
    autoDensity: true,
    backgroundAlpha: 0
  } as const;

  const [blockId, setBlockId] = useState<Id>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const color = useColorModeValue('#000000', '#ffffff');

  const onWheelEvent = (event: Event) => {
    event.preventDefault();
  };

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

  useInfiniteLoad({
    viewportRef,
    fetchPage: fetchPreviousPage,
    tree,
    loadCondition: ({ topY, viewportTopY }) =>
      viewportTopY < topY + SCROLL_BUFFER,
    hasMore: hasPreviousPage
  });
  useInfiniteLoad({
    viewportRef,
    fetchPage: fetchNextPage,
    tree,
    loadCondition: ({ bottomY, viewportBottomY }) =>
      viewportBottomY > bottomY - SCROLL_BUFFER,
    hasMore: hasNextPage
  });

  return (
    <>
      <Stage
        width={width}
        height={height}
        options={stageOptions}
        onMount={(app) => {
          const canvas = app.view;
          canvas.addEventListener('wheel', onWheelEvent, false);
          canvas.addEventListener('mousewheel', onWheelEvent, false);
          canvas.addEventListener('DOMMouseScroll', onWheelEvent, false);
        }}
        onUnmount={(app) => {
          const canvas = app.view;
          canvas.addEventListener('wheel', onWheelEvent, false);
          canvas.addEventListener('mousewheel', onWheelEvent, false);
          canvas.addEventListener('DOMMouseScroll', onWheelEvent, false);
        }}
      >
        <Viewport
          ref={viewportRef}
          plugins={['drag', 'pinch', 'wheel']}
          screenWidth={width}
          screenHeight={height}
          worldWidth={1000}
          worldHeight={1000}
          centerX={0}
          centerY={-tipHeight * BLOCK_V_OFFSET}
        >
          <PixiTree
            tree={tree}
            x={windowWidth / 2}
            y={START_Y}
            color={color}
            onClick={(blockId) => {
              setBlockId(blockId);
              onOpen();
            }}
          />
        </Viewport>
      </Stage>
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

export default TreeComponent;
