import { configureStore } from '@reduxjs/toolkit';

import { gameSlice } from '@/settings/GameWIthRedux';

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
