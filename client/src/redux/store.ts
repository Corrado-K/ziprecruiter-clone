import { configureStore } from "@reduxjs/toolkit";
import jobPostReducer from './jobPostSlice'
import applicationReducer from './applicationSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export const store = configureStore({
     reducer: {
          jobPost: jobPostReducer,
          application: applicationReducer
     },
     middleware(getDefaultMiddleware) {
          return getDefaultMiddleware({ serializableCheck: false })
     },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector