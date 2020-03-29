import {screen, waitForElementToBeRemoved, userEvent} from 'test/app-test-utils'
import {buildUser} from 'test/generate'

beforeAll(() => {
  const root = document.createElement('div')
  root.id = 'root'
  document.body.append(root)
  document.body.focus()
})

test('can login and use the book search', async () => {
  require('../index')

  const user = buildUser()

  userEvent.click(screen.getByRole('button', {name: /register/i}))
  await userEvent.type(screen.getByLabelText(/username/i), user.username)
  await userEvent.type(screen.getByLabelText(/password/i), user.password)

  userEvent.click(screen.getByRole('button', {name: /register/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  const searchInput = screen.getByPlaceholderText(/search/i)
  userEvent.type(searchInput, 'voice of war')

  userEvent.click(screen.getByLabelText(/search/i))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  expect(screen.getByText(/voice of war/i)).toBeInTheDocument()

  userEvent.click(screen.getByRole('button', {name: /logout/i}))

  expect(searchInput).not.toBeInTheDocument()
})
