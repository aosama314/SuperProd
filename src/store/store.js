import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./reducers/categories";
import challengesSlice from "./reducers/challenges";
import challengeTasksSlice from "./reducers/challengeTasks";
import userSlice from "./reducers/user";

export const store = configureStore({
  reducer: {
    user: userSlice,
    challenges: challengesSlice,
    categories: categoriesSlice,
    tasks: challengeTasksSlice,
  },
});
