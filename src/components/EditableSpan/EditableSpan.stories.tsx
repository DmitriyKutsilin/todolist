import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { EditableSpan } from './EditableSpan'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  args: {
    value: 'Change me',
    onChange: fn(),
  },
} satisfies Meta<typeof EditableSpan>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const EditableSpanStory: Story = {}
