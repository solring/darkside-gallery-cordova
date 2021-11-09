import articleSlice from './reduxSlice/articleSlice'
import { configureStore } from '@reduxjs/toolkit'

export default function configureAppStore(preloadedState = {}) {
  const store = configureStore({
    reducer: {
      article: articleSlice,
    },
    preloadedState
  })
  return store
}

