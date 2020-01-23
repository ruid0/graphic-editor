import { createStore, createEvent, forward } from 'effector';

export const triggeredDraw = createEvent();
export const $ctx = createStore(null);
export const setContext = createEvent();
export const handledMouseDown = createEvent();
export const handledMouseMove = createEvent();
export const handledOnMouseUp = createEvent();
export const componentMounted = createEvent();
export const componentUnmounted = createEvent();

const $isDrawing = createStore(false);
const $currentShape = createStore(null);
const $mousePosition = createStore({ x: null, y: null });

let rectangle = null;
let requestAnimationID = null;

$ctx.on(setContext, (_, ctx) => ctx).reset(componentUnmounted);
$isDrawing.on(handledMouseDown, () => true).reset(handledOnMouseUp);

$currentShape
  .on(triggeredDraw, (_, action) => {
    rectangle = rect({ x: 1, y: 1, w: 1, h: 1 });
    return initShape(action);
  })
  .reset(handledOnMouseUp);

$mousePosition
  .on(handledMouseDown, (_, { clientX, clientY }) => ({
    startX: clientX,
    startY: clientY,
  }))
  .on(handledMouseMove, (state, { clientX, clientY }) => ({
    ...state,
    x: clientX,
    y: clientY,
  }));

componentUnmounted.watch(() => {
  cancelAnimationFrame(requestAnimationID);
});

componentMounted.watch(() => {
  animate();
});

const circle = ({ x, y, r }) => {
  const context = $ctx.getState();

  const draw = ({ x, y, r }) => {
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI, false);
    context.closePath();
    context.stroke();
  };

  return {
    draw,
  };
};

const rect = ({ x, y, w, h }) => {
  const context = $ctx.getState();

  const draw = ({ x, y, w, h }) => {
    context.beginPath();
    context.rect(x, y, w, h);
    context.closePath();
    context.stroke();
  };

  return {
    draw,
  };
};

const initShape = ({ type, shape }) => {
  if (type === 'draw') {
    if (shape === 'circle') {
      return circle({ x: 1, y: 1, r: 1 });
    }
    if (shape === 'rect') {
      return rect({ x: 1, y: 1, w: 1, h: 1 });
    }
  }
};

function animate() {
  requestAnimationID = requestAnimationFrame(animate);
  if ($ctx.getState() && $currentShape.getState() && $isDrawing.getState()) {
    $ctx.getState().clearRect(0, 0, innerWidth, innerHeight);

    $currentShape.getState().draw({
      x: $mousePosition.getState().startX,
      y: $mousePosition.getState().startY,
      r: Math.abs($mousePosition.getState().x - $mousePosition.getState().startX),
    });
    rectangle.draw({
      x: $mousePosition.getState().startX,
      y: $mousePosition.getState().startY,
      w: Math.abs($mousePosition.getState().x - $mousePosition.getState().startX),
      h: Math.abs($mousePosition.getState().y - $mousePosition.getState().startY),
    });
  }
}
