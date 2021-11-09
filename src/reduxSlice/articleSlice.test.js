import createServer from '../mockServer'

import articleSlice, { fetchArticle } from './articleSlice'
import { configureStore } from '@reduxjs/toolkit'

let server = null


beforeAll(() => {
  server = createServer()

})

afterAll(() => {
  server.shutdown()
})

test('get articles', async () => {
  const store = configureStore({
    reducer: {
      article: articleSlice,
    }
  })

  await store.dispatch(fetchArticle({
    category: "someCategory",
    length: 12,
    start: 0,
  }))

  let state = store.getState()
  console.log("after dispatch")
  console.log(state)

})
