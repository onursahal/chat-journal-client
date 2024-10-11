import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Save changes',
  },
}

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    className: 'bg-blue-600 hover:bg-blue-700',
  },
}
