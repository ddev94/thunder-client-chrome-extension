import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from './slices/app.slice';
import { responseSlice } from './slices/response.slice';

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    response: responseSlice.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;