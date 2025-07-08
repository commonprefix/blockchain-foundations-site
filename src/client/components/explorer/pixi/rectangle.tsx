import { PixiComponent } from '@pixi/react-pixi';
import { Graphics, Rectangle as PixiRectangle } from 'pixi.js';

interface RectangleProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  onClick?: () => void;
}

export const Rectangle = PixiComponent<RectangleProps, Graphics>('Rectangle', {
  create: () => new Graphics(),
  applyProps: (ins, oldProps, props) => {
    ins.clear();
    if (props.borderColor !== undefined) {
      ins.lineStyle(
        props.borderWidth ?? 1,
        parseInt(props.borderColor.replace('#', ''), 16)
      );
    }
    if (props.color !== undefined) {
      ins.beginFill(parseInt(props.color.replace('#', ''), 16));
    }
    ins.hitArea = new PixiRectangle(
      props.x,
      props.y,
      props.width,
      props.height
    );
    ins.drawRoundedRect(
      props.x,
      props.y,
      props.width,
      props.height,
      props.borderRadius ?? 0
    );
    ins.interactive = true;
    if (oldProps.onMouseOver) ins.off('mouseover', oldProps.onMouseOver);
    if (props.onMouseOver) ins.on('mouseover', props.onMouseOver);
    if (oldProps.onMouseOut) ins.off('mouseout', oldProps.onMouseOut);
    if (props.onMouseOut) ins.on('mouseout', props.onMouseOut);
    if (oldProps.onClick) ins.off('click', oldProps.onClick);
    if (props.onClick) ins.on('click', props.onClick);
    ins.endFill();
  }
});
