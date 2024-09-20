import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {action} from '@storybook/addon-actions'
import * as React from "react";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {ReduxStoreProviderDecorator} from "./state/ReduxStoreProviderDecorator";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    decorators: [ReduxStoreProviderDecorator]
} satisfies Meta<typeof AppWithRedux>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AppWithReduxStory: Story = {

};