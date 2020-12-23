import { useCurrentUser } from 'app/hooks/useCurrentUser'

jest.mock('app/hooks/useCurrentUser')
// eslint-disable-next-line unused-imports/no-unused-vars-ts
const mockUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>

test.skip('renders blitz documentation link', () => {
  // This is an example of how to ensure a specific item is in the document
  // But it's disabled by default (by test.skip) so the test doesn't fail
  // when you remove the the default content from the page
  // This is an example on how to mock api hooks when testing
  // mockUseCurrentUser.mockReturnValue({
  //   id: 1,
  //   name: 'User',
  //   email: 'user@email.com',
  //   roles: [{ name: USER_ROLE.User }],
  // })
  //
  // const { getByText } = render(<Home />)
  // const text = getByText(/Congrats/i)
  // expect(text).toBeInTheDocument()
})
