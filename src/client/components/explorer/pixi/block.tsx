import { Text, useApp } from '@pixi/react-pixi';
import { Block } from 'common/block';
import { Application, TextStyle } from 'pixi.js';

import { Rectangle } from './rectangle';

const FONT_SIZE = 16;
const LINE_HEIGHT = 1.2 * FONT_SIZE;
const MAX_TEXT_WIDTH = 40;

interface RowProps {
  color: string;
  property: string;
  value: string;
  x: number;
  y: number;
}

function Row({ property, value, x, y, color }: RowProps) {
  const text = `${property}: ${value}`;
  const cappedText =
    text.length <= MAX_TEXT_WIDTH
      ? text
      : `${text.slice(0, MAX_TEXT_WIDTH - 3)}…`;

  const textStyle =
    color === '#ffffff'
      ? new TextStyle({
          fontFamily: 'Helvetica, sans-serif',
          fontSize: 16,
          fill: color
        })
      : new TextStyle({
          fontFamily: 'Helvetica, sans-serif',
          fontSize: 16,
          fill: color
        });

  return (
    <>
      <Text text={cappedText} x={x} y={y} style={textStyle} />
    </>
  );
}

interface PixiBlockProps {
  block: Block;
  x: number;
  y: number;
  color: string;
  onClick?: () => void;
}

export const BLOCK_H_PAD = 10;
export const BLOCK_V_PAD = 8;

export const BLOCK_WIDTH = 2 * BLOCK_H_PAD + 20 * FONT_SIZE;
export const BLOCK_HEIGHT = 2 * BLOCK_V_PAD + 5 * LINE_HEIGHT;

export const BLOCK_SPACING = 48;
export const BLOCK_H_OFFSET = BLOCK_WIDTH + BLOCK_SPACING;
export const BLOCK_V_OFFSET = BLOCK_HEIGHT + BLOCK_SPACING;

function changeCursorMode(app: Application, cursorMode: string) {
  app.renderer.plugins.interaction.cursorStyles.default = cursorMode;
  app.renderer.plugins.interaction.setCursorMode(cursorMode);
}

export function PixiBlock({ block, x, y, color, onClick }: PixiBlockProps) {
  const dateString = new Date(block.created * 1000).toLocaleString();

  const rectX = x - BLOCK_WIDTH / 2;
  const rectY = y;
  const textStartX = rectX + BLOCK_H_PAD;
  const textStartY = rectY + BLOCK_V_PAD;

  const app = useApp();

  return (
    <>
      <Rectangle
        x={rectX}
        y={rectY}
        width={BLOCK_WIDTH}
        height={BLOCK_HEIGHT}
        borderColor={color}
        borderWidth={2}
        borderRadius={10}
        onMouseOver={() => changeCursorMode(app, 'pointer')}
        onMouseOut={() => changeCursorMode(app, 'inherit')}
        onClick={onClick}
      />
      <Row
        x={textStartX}
        y={textStartY}
        property="Block ID"
        value={block.id}
        color={color}
      />
      <Row
        x={textStartX}
        y={textStartY + LINE_HEIGHT}
        property="Miner"
        value={block.miner ?? 'Anonynous'}
        color={color}
      />
      <Row
        x={textStartX}
        y={textStartY + 2 * LINE_HEIGHT}
        property="Created"
        value={dateString}
        color={color}
      />
      <Row
        x={textStartX}
        y={textStartY + 3 * LINE_HEIGHT}
        property="Note"
        value={block.note ?? 'None'}
        color={color}
      />
      <Row
        x={textStartX}
        y={textStartY + 4 * LINE_HEIGHT}
        property="Transactions"
        value={block.txids.length.toString()}
        color={color}
      />
    </>
  );
}
