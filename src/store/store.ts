import { combineReducers, configureStore } from '@reduxjs/toolkit'
import settingsReducer from "./settings.slice"
import typingReducer from "./typing.slice"
import { wordsApi } from '@/service/words.service'

const reducer = combineReducers({
  settingsData: settingsReducer,
  typingData: typingReducer,

  [wordsApi.reducerPath]: wordsApi.reducer,
})

export const store = configureStore({
  reducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wordsApi.middleware),
  
  devTools: false
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch