import { Block } from 'common/block';
import { Fragment } from 'react';

import {
  BLOCK_H_OFFSET,
  BLOCK_HEIGHT,
  BLOCK_V_OFFSET,
  PixiBlock
} from './block';
import { Line } from './line';

export interface PixiTreeProps {
  tree: Record<number, Block[]>;
  x: number;
  y: number;
  color: string;
  onClick?: (id: string) => void;
}

export function getBounds(y: number, tree: Record<number, Block[]>) {
  const heights = Object.keys(tree).map((key) => parseInt(key));
  const maxHeight = Math.max(...heights);
  const minHeight = Math.min(...heights);
  const topY = y - maxHeight * BLOCK_V_OFFSET;
  const bottomY = y - minHeight * BLOCK_V_OFFSET + BLOCK_HEIGHT;
  return { topY, bottomY };
}

export function PixiTree({
  tree: unsortedTree,
  x,
  y,
  color,
  onClick
}: PixiTreeProps) {
  // Sort unsortedTree by key
  const sortedTree = Object.entries(unsortedTree).sort(
    ([a], [b]) => parseInt(a) - parseInt(b)
  );
  const tree: Record<number, Block[]> = [];
  sortedTree.forEach(([key, row]) => {
    const height = parseInt(key);
    if (!tree[height - 1]) {
      tree[height] = [...row];
      return;
    }
    const sortLookup = Object.fromEntries(
      tree[height - 1].map((block, j) => [block.id, j])
    );
    sortLookup[''] = -1;
    tree[height] = [...row].sort(
      (a, b) =>
        (sortLookup[a.previd ?? ''] ?? -1) - (sortLookup[b.previd ?? ''] ?? -1)
    );
  });

  const treeEntries = Object.entries(tree).map(([key, row]) => ({
    height: parseInt(key),
    row
  }));

  const blockCoords = Object.fromEntries(
    treeEntries.flatMap(({ height, row }) => {
      return row.map((block, j) => {
        const entry: [string, { x: number; y: number }] = [
          block.id,
          {
            x: x + (j - (row.length - 1) / 2) * BLOCK_H_OFFSET,
            y: y - height * BLOCK_V_OFFSET
          }
        ];
        return entry;
      });
    })
  );

  return (
    <>
      {treeEntries.map(({ row }) =>
        row.map((block) => {
          const { x: blockX, y: blockY } = blockCoords[block.id];
          const parentCoords = block.previd
            ? blockCoords[block.previd]
            : undefined;
          return (
            <Fragment key={block.id}>
              <PixiBlock
                block={block}
                x={blockX}
                y={blockY}
                color={color}
                onClick={() => onClick?.(block.id)}
              />
              {parentCoords && (
                <Line
                  fromX={blockX}
                  fromY={blockY + BLOCK_HEIGHT}
                  toX={parentCoords.x}
                  toY={parentCoords.y}
                  thickness={2}
                  color={color}
                />
              )}
            </Fragment>
          );
        })
      )}
    </>
  );
}
