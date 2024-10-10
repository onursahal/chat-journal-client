// __tests__/index.test.ts
import { render, screen } from '@testing-library/react'

describe('Home Page', () => {
  it('renders a heading', () => {
    let count = 0
    render(
      <div>
        <button onClick={() => count++}>Hello</button>
      </div>
    )
    const button: HTMLButtonElement = screen.getByText('Hello')
    button.click()
    expect(count).toBe(1)
  })
})
