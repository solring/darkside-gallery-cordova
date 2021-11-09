import React from 'react'
import { render, screen, waitFor, fireEvent, getByRole, getAllByRole} from '@testing-library/react'

import MainScreen from '../MainScreen'

import { Provider } from 'react-redux'
import createStore from '../../store'

// mock server
import mockServer from '../../mockServer'

let store = null
let server = null

beforeAll(() => {
  server = mockServer()
})

afterAll(() => {
  server.shutdown()
})

beforeEach(() => {
  store = createStore()
})

it('General tests: phone layout', async () => {
  const { container } = render(
    <Provider store={store}>
      <MainScreen />
    </Provider>
  )

  // Wait for fetch to complete
  const tabs = await screen.findByTestId('navTabs', {}, {timeout: 10000})
  const grid = await screen.findByTestId('picGrid', {}, {timeout: 10000})

  // snapshot
  expect(container.firstChild).toMatchSnapshot()

  // Check articles
  const articles = grid.querySelectorAll('article')
  let post = articles[0]

  // 1. long press
  fireEvent['touchStart'](post)

  // 2. check overlay display
  await waitFor(() => expect(grid.querySelector("[data-longpress='true']")).not.toBeNull(), {timeout: 5000})

  // 3. end long press
  fireEvent['touchEnd'](post)

  // Click tabs
  const tab1 = getByRole(tabs, 'button', {name: "fan-art"})
  const tab2 = getByRole(tabs, 'button', {name: "illustration"})
  const tab3 = getByRole(tabs, 'button', {name: "design"})

  expect(screen.getAllByRole('button', {name: /#.*?/})).toHaveLength(9)

  const accordions = tabs.querySelectorAll(".accordion-collapse")

  fireEvent.click(tab1)
  await waitFor(() => expect(accordions[0]).toHaveClass('show'), {timeout: 3000})

  fireEvent.click(tab2)
  await waitFor(() => expect(accordions[1]).toHaveClass('show'), {timeout: 3000})

  fireEvent.click(tab3)
  await waitFor(() => expect(accordions[2]).toHaveClass('show'), {timeout: 3000})

})

it('General tests: normal layout', async () => {

  const mockMedia = (query) => {
    return {
      matches: false,
      media: query,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }
  }
  global.matchMedia = mockMedia

  const { container } = render(
    <Provider store={store}>
      <MainScreen />
    </Provider>
  )

  // Wait for fetch to complete
  const tabs = await screen.findByTestId('navTabs', {}, {timeout: 10000})
  await screen.findByTestId('picGrid', {}, {timeout: 10000})

  // snapshot
  expect(container.firstChild).toMatchSnapshot()

  // Click tabs
  const tab1 = getByRole(tabs, 'button', {name: "fan-art"})
  const tab2 = getByRole(tabs, 'button', {name: "illustration"})
  const tab3 = getByRole(tabs, 'button', {name: "design"})

  fireEvent.click(tab1)
  const tag = await screen.findByText(/Golden Kamuy/)
  expect(screen.getAllByRole('button', {name: /#.*?/})).toHaveLength(6)

  fireEvent.click(tab2)

  fireEvent.click(tab3)
  expect(await screen.findByText(/Poster/)).toBeInTheDocument()
  expect(screen.getAllByRole('button', {name: /#.*?/})).toHaveLength(3)

  // Check articles
  // 1. wait for fetch again
  const grid = await screen.findByTestId('picGrid', {}, {timeout: 10000})
  const articles = getAllByRole(grid, 'button')

  // 2. click
  fireEvent.click(articles[0])
  let ele = null
  await waitFor(() => expect(ele = document.querySelector(".fade.modal.show")).not.toBeNull(), {timeout:3000})
  await waitFor(() => expect(document.querySelector(".fade.modal-backdrop.show")).not.toBeNull(), {timeout:3000})
  const close = getByRole(ele, 'button', {name: "close"})
  fireEvent.click(close)
})