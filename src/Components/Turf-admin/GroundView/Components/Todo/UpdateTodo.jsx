import React from "react";

function UpdateTodo({ updateData, changeTask, updateTask, cancelUpdate }) {
    return (
        <>
            {/* Update Task */}
            <div className="">
                <div className="">
                    <input
                        value={updateData && updateData.task}
                        onChange={(e) => changeTask(e)}
                        className="m-2 rounded"
                        type="text"
                    />
                </div>
                <div className="ms-2">
                    <button onClick={updateTask} className="bg-red-400 px-4 py-2 rounded me-5">
                        Update
                    </button>
                    <button onClick={cancelUpdate} className="bg-green-400 px-4 py-2 rounded">
                        Cancel
                    </button>
                </div>
            </div>
            <br />
        </>
    );
}

export default UpdateTodo;
