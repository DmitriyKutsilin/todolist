import React, {ChangeEvent, memo} from 'react';
import Checkbox from "@mui/material/Checkbox/Checkbox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ListItem from "@mui/material/ListItem/ListItem";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../state/tasks-reducer";
import {TaskStatuses, TaskType} from '../../api/todolist-api';

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const TaskWithRedux = memo(({
                              task,
                              todolistId,
                          }: TaskPropsType) => {
    const dispatch = useDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTaskAC(todolistId, task.id))
        // removeTask(todolistId, task.id)
    }

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const isDone = e.currentTarget.checked
        dispatch(changeTaskStatusAC(todolistId, task.id, isDone ? TaskStatuses.Completed : TaskStatuses.New))
        // changeTaskStatus(todolistId, task.id, isDone)
    }

    const updateTaskHandler = (title: string) => {
        dispatch(changeTaskTitleAC(todolistId, task.id, title))
        // updateTask(todolistId, task.id, title)
    }

    return (
        <ListItem
            sx={{
                p: 0,
                justifyContent: "space-between",
                opacity: task.status === TaskStatuses.Completed ? 0.5 : 1,
            }}>
            <div className="taskCenter">
                <Checkbox size="medium" checked={task.status === TaskStatuses.Completed} onChange={onChangeStatusHandler}/>
                <EditableSpan value={task.title} onChange={updateTaskHandler}></EditableSpan>
            </div>
            <IconButton size="medium" color="default" onClick={removeTaskHandler}>
                <RemoveCircleOutlineIcon fontSize="inherit"/>
            </IconButton>
        </ListItem>
    );
});