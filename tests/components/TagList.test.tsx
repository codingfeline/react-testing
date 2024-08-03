import { render, screen, waitFor } from '@testing-library/react'
import TagList from '../../src/components/TagList'
describe('TagList', () => {
  it('should render tags', async () => {
    render(<TagList />)

    //? waitFor is a utility function in React-Testing library
    //should only have assertions, not other callbacks
    // await waitFor(() => {
    //   const listItems = screen.getAllByRole('listitem')
    //   expect(listItems.length).toBeGreaterThan(0)
    // })

    // below is the same as above - waitFor and get query
    const listItems = await screen.findAllByRole('listitem')
    expect(listItems.length).toBeGreaterThan(0)
  })
})
