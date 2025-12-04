import type { Modifier } from "@dnd-kit/core";

export const centerOnCursor: Modifier = (args) => {
  const { transform, activatorEvent, activeNodeRect } = args;

  let totalOffsetX = 0;
  let totalOffsetY = 0;

  if (activatorEvent && activeNodeRect) {
    const click = activatorEvent as PointerEvent;

    totalOffsetX = click.offsetX - activeNodeRect.width / 2;
    totalOffsetY = click.offsetY - activeNodeRect.height / 2;
  }

  return {
    ...transform,
    x: transform.x + totalOffsetX,
    y: transform.y + totalOffsetY,
  };
};
