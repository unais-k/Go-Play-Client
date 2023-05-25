import React, { useEffect, useState } from "react";
import TodoComponent from "./TodoComponent";
import UpdateTodo from "./UpdateTodo";
import AddTaskTodo from "./AddTaskTodo";
import {
    FindRuleReqApi,
    RuleAddReqApi,
    RuleDeleteReqApi,
    RuleUpdateReqApi,
} from "../../../../../API/Services/TurfAdminRequest";
import { useSelector } from "react-redux";
import { message } from "antd";

function TodoApp({ id }) {
    const token = useSelector((state) => state.turfAdminLogin.token);
    const [toDo, setToDo] = useState([]);

    const [newTask, setNewTask] = useState("");
    const [updateData, setUpdateData] = useState("");
    const findTask = async () => {
        const response = await FindRuleReqApi({ id: id }, token);
        if (response.status === 201) {
            setToDo(response.data.result.rules);
        }
    };

    useEffect(() => {
        if (id) {
            findTask();
        }
    }, [toDo && id]);

    const addTask = async () => {
        if (newTask) {
            let num = toDo.length + 1;
            const response = await RuleAddReqApi({ task: newTask, index: num, id: id }, token);
            let newEntry = { id: num, title: newTask };
            // setToDo([...toDo, newEntry]);
            setNewTask("");

            setToDo([...toDo, newTask]);
        }
    };

    const deleteTask = async (deleteId) => {
        const response = await RuleDeleteReqApi({ deleteId: deleteId, id: id }, token);
        if (response.status === 201) {
            setToDo(response.data.result.rules);
        } else {
            message.error("Something went wrong");
        }
    };

    const cancelUpdate = () => {
        setUpdateData("");
    };

    const changeTask = (e) => {
        let newEntry = {
            index: updateData.index,
            task: e.target.value,
        };

        setUpdateData(newEntry);
    };

    const updateTask = async () => {
        let filterRecords = [...toDo].filter((task) => task.index !== updateData.index);
        let updatedObject = [...filterRecords, updateData];
        const response = await RuleUpdateReqApi({ data: updateData, id: id }, token);
        if (response.status === 202) {
            setToDo(response.data.result.rules);
        } else {
            message.warning("Something went wrong");
        }
        setUpdateData("");
    };
    return (
        <div className="">
            {updateData && updateData ? (
                <UpdateTodo
                    updateData={updateData}
                    changeTask={changeTask}
                    updateTask={updateTask}
                    cancelUpdate={cancelUpdate}
                />
            ) : (
                <AddTaskTodo newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
            )}
            {toDo && toDo.length ? "" : "No Tasks..."}

            <TodoComponent toDo={toDo} id={id} setUpdateData={setUpdateData} deleteTask={deleteTask} />
        </div>
    );
}

export default TodoApp;
