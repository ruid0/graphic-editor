import { createStore, createEvent, forward } from 'effector';

export const triggeredDraw = createEvent();
export const $ctx = createStore(null);
export const $upperCanvasContext = createStore(null);
export const $selectedArea = createStore({});
export const setContext = createEvent();
export const setUpperCanvasContext = createEvent();
export const handledMouseDown = createEvent();
export const handledMouseMove = createEvent();
export const handledOnMouseUp = createEvent();
export const componentMounted = createEvent();
export const componentUnmounted = createEvent();
export const resetShape = createEvent();

const $isDrawing = createStore(false);
const $currentShape = createStore(null);
const $mousePosition = createStore({ x: null, y: null });
const $history = createStore(null);

let rectangle = null;
let requestAnimationID = null;

$ctx.on(setContext, (_, ctx) => ctx).reset(componentUnmounted);
$upperCanvasContext.on(setUpperCanvasContext, (_, ctx) => ctx).reset(componentUnmounted);

$isDrawing.on(handledMouseDown, () => true).reset(handledOnMouseUp);

$currentShape.on(triggeredDraw, (_, action) => initShape(action)).reset(resetShape);

$mousePosition.on(handledMouseDown, (_, { clientX, clientY }) => {
  if ($currentShape.getState()) {
    $currentShape.getState().shape.draw({
      x: clientX,
      y: clientY,
      r: 50,
    });
  }

  return {
    startX: clientX,
    startY: clientY,
  };
});
// .on(handledMouseMove, (state, { clientX, clientY }) => ({
//   ...state,
//   x: clientX,
//   y: clientY,
// }));

componentUnmounted.watch(() => {
  cancelAnimationFrame(requestAnimationID);
});

componentMounted.watch(() => {
  animate();
});

$selectedArea
  .on(handledOnMouseUp, () => {
    if (
      $mousePosition.getState().startX &&
      $mousePosition.getState().startY &&
    ) {
      const { x, y, r } = $history.getState();
      const { startX, startY } = $mousePosition.getState();
      const distance = getDistance(x, y, startX, startY);
      const react = rect({});
      if (distance < r * 2) {
        react.draw({ x: x - r, y: y - r, w: r * 2, h: r * 2 });
      } else {
        $upperCanvasContext.getState().clearRect(0, 0, innerWidth, innerHeight);
      }
    }
  })
  .reset(resetShape);

$history.on(handledOnMouseUp, state => {
  if (!$currentShape.getState()) return;
  const currentShape = $currentShape.getState();
  resetShape();

  return {
    ...currentShape.shape.getShape(),
    type: currentShape.type,
  };
});

$history.watch(state => {
  console.log(state);
});

const circle = ({ x, y, r }) => {
  const context = $ctx.getState();
  let circleParams = null;

  const draw = params => {
    circleParams = params;
    const { x, y, r } = circleParams;
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI, false);
    context.closePath();
    context.fillStyle = '#fff';
    context.fill();
  };

  const getShape = () => {
    return {
      ...circleParams,
    };
  };

  return {
    draw,
    getShape,
  };
};


// TODO: Refactor to separate function
const rect = ({ x, y, w, h }) => {
  const context = $upperCanvasContext.getState();

  const draw = ({ x, y, w, h }) => {
    context.beginPath();
    context.rect(x, y, w, h);
    context.closePath();
    context.strokeStyle = '#6aa2ff';
    context.stroke();
    drawHandlers(x, y, h, w);
  };

  const drawHandler = (x, y, w, h) => {
    context.beginPath();
    context.rect(x, y, w, h);
    context.closePath();
    context.fillStyle = '#6aa2ff';
    context.fill();
  };

  const drawHandlers = (x, y, h, w) => {
    const height = 12;
    const width = 12;

    drawHandler(x - 5, y - 5, width, height);
    drawHandler(x - 5, y + h - 5, width, height);
    drawHandler(x + w - 5, y - 7, width, height);
    drawHandler(x + w - 5, y + h - 5, width, height);
  };

  return {
    draw,
  };
};


// TODO: refactor to remove if conditions
const initShape = ({ type, shape }) => {
  if (type === 'draw') {
    if (shape === 'circle') {
      return {
        shape: circle({ x: 1, y: 1, r: 1 }),
        type: 'circle',
      };
    }
    if (shape === 'rect') {
      return {
        shape: rect({ x: 1, y: 1, w: 1, h: 1 }),
        type: 'rect',
      };
    }
  }
};

function animate() {
  requestAnimationID = requestAnimationFrame(animate);
  if ($ctx.getState() && $currentShape.getState() && $isDrawing.getState()) {
    $ctx.getState().clearRect(0, 0, innerWidth, innerHeight);

    $currentShape.getState().shape.draw({
      x: $mousePosition.getState().startX,
      y: $mousePosition.getState().startY,
      r: Math.abs($mousePosition.getState().x - $mousePosition.getState().startX),
    });
  }
}

function getDistance(x1, y1, x2, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
