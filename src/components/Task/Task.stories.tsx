import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {action} from '@storybook/addon-actions'
import * as React from "react";
import {useState} from "react";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'TODOLIST/Task',
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    args: {
        task: {
            id: '121dgzsg14',
            title: 'HTML',
            status: TaskStatuses.New,
            description: '',
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            todoListId: "todolistId1",
            order: 0,
            addedDate: ''
        },
        todolistId: '190sfeesf3',
        removeTask: fn(),
        changeTaskStatus: fn(),
        updateTask: fn(),
    }
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TaskIsNotDoneStory: Story = {

};
export const TaskIsDoneStory: Story = {
    args: {
        task: {
            id: '121dgzsg14sefes',
            title: 'Redux',
            status: TaskStatuses.New,
            description: '',
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            todoListId: "todolistId1",
            order: 0,
            addedDate: ''
        }
    }
};

const ToggleTask = () => {
    const [task, setTask] = useState({
        id: '121dgzsg14',
        title: 'HTML',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: "todolistId1",
        order: 0,
        addedDate: ''
    })

    const changeTaskStatus = () => {
        setTask({...task, status: task.status === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTask({...task, title})
    }

    return <Task task={task} todolistId={'2ajf49e4s'} removeTask={action('remove task')} changeTaskStatus={changeTaskStatus} updateTask={changeTaskTitle}/>
}

export const ToggleTaskStorie: Story = {
    render: () => <ToggleTask/>
}