import { atom } from 'recoil';

export const playingState = atom({
  key: 'playingState',
  default: false,
});

export const playedState = atom({
  key: 'playedState',
  default: 0,
});
