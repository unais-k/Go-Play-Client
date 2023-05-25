import React from "react";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FindRuleReqApi, RuleUpdateFindReqApi } from "../../../../../API/Services/TurfAdminRequest";
import { useSelector } from "react-redux";
import { message } from "antd";

function TodoComponent({ toDo, setUpdateData, id, deleteTask }) {
    const token = useSelector((state) => state.turfAdminLogin.token);
    const refresh = async () => {
        const response = await FindRuleReqApi(id, token);
    };

    const handleUpdate = async (e) => {
        const response = await RuleUpdateFindReqApi({ index: e, id: id }, token);
        if (response.status === 201) {
            setUpdateData(response.data.result);
        } else {
            message.error("Something went wrong");
        }
    };
    return (
        <>
            {toDo?.length > 0 &&
                toDo?.map((task, i) => {
                    return (
                        <div key={task._id}>
                            <div className="flex flex-col pe-5">
                                <div className="m-2 flex justify-between">
                                    <div>
                                        <span className=" me-2">{i + 1}</span>
                                        <span className="">{task.task}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="me-3" title="Edit" onClick={() => handleUpdate(task.index)}>
                                            <BsPencilFill size={20} />
                                        </span>

                                        <span title="Delete" onClick={() => deleteTask(task._id)}>
                                            <BsFillTrashFill size={20} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </>
    );
}

export default TodoComponent;
