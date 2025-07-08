import { PixiComponent } from '@pixi/react-pixi';
import { Graphics } from 'pixi.js';

interface LineProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  color: string;
  thickness: number;
}

export const Line = PixiComponent<LineProps, Graphics>('Line', {
  create: () => new Graphics(),
  applyProps: (ins, _, props) => {
    ins.clear();
    ins
      .lineStyle(props.thickness, parseInt(props.color.replace('#', ''), 16))
      .moveTo(props.fromX, props.fromY)
      .lineTo(props.toX, props.toY);
  }
});
