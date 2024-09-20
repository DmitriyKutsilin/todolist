import React, {ChangeEvent, memo} from 'react';
import Checkbox from "@mui/material/Checkbox/Checkbox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ListItem from "@mui/material/ListItem/ListItem";
import {TaskType} from "../../AppWithRedux";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    updateTask: (todolistId: string, taskId: string, title: string) => void
}

export const Task = memo(({
                              task,
                              todolistId,
                              removeTask,
                              changeTaskStatus,
                              updateTask
                          }: TaskPropsType) => {
    console.log("task")
    const removeTaskHandler = () => {
        removeTask(todolistId, task.id)
    }

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const isDone = e.currentTarget.checked
        changeTaskStatus(todolistId, task.id, isDone)
    }

    const updateTaskHandler = (title: string) => {
        updateTask(todolistId, task.id, title)
    }

    return (
        <ListItem
            sx={{
                p: 0,
                justifyContent: "space-between",
                opacity: task.isDone ? 0.5 : 1,
            }}>
            <div className="taskCenter">
                <Checkbox size="medium" checked={task.isDone} onChange={onChangeStatusHandler}/>
                <EditableSpan value={task.title} onChange={updateTaskHandler}></EditableSpan>
            </div>
            <IconButton size="medium" color="default" onClick={removeTaskHandler}>
                <RemoveCircleOutlineIcon fontSize="inherit"/>
            </IconButton>
        </ListItem>
    );
});