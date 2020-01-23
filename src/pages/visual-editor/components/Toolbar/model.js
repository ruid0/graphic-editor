import { createStore, createEvent, forward } from 'effector';
import { triggeredDraw } from '../Canvas/draw';

export const $toolbar = createStore(null);
export const triggeredAction = createEvent();

$toolbar.on(triggeredAction, (state, action) => {
  return {
    selected: action,
  };
});

forward({ from: triggeredAction, to: triggeredDraw });
