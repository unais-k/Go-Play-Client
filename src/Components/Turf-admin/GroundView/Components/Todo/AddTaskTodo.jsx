import React from "react";

function AddTaskTodo({ newTask, setNewTask, addTask }) {
    const handleTodo = (e) => {
        e.preventDefault();
        setNewTask(e.target.value);
    };
    return (
        <>
            {/* Add Task */}
            <div className="">
                <div className="">
                    <input value={newTask} type="text" placeholder="Rules" onChange={handleTodo} className="rounded m-2" />
                </div>
                <div className="">
                    <button onClick={addTask} className="bg-gray-300 px-3 py-2 rounded">
                        Add Rule
                    </button>
                </div>
            </div>
            <br />
        </>
    );
}

export default AddTaskTodo;
