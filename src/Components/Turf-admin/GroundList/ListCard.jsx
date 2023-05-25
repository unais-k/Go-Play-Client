import React from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function ListCard({ res }) {
    const navigate = useNavigate();
    const handleView = (id) => {
        navigate("/turf-admin/ground-view/" + id);
    };
    return (
        <article className="overflow-hidden rounded-lg shadow-lg">
            <a href="#">
                <img alt="Placeholder" className="block h-auto w-full" src={res?.images[0]} />
            </a>

            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 className="text-lg">
                    <a className="no-underline hover:underline text-black" href="#">
                        {res?.name}
                    </a>
                </h1>
                <p className="text-grey-darker text-sm">{res?.place}</p>
            </header>
            <div className="text-center">{res?.events?.length > 0 ? <></> : <>Add Grounds to host</>}</div>

            <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                <a className="flex items-center no-underline hover:underline text-black" href="#">
                    <p className="ml-2 text-sm">{res?.nearCity}</p>
                </a>
                <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
                    <div
                        className=" flex bg-black w-fit  text-white m-2 py-3 px-4 rounded"
                        onClick={() => handleView(res._id)}
                    >
                        <button className="me-3">View</button>
                        <BsFillArrowRightCircleFill size={23} />
                    </div>
                </a>
            </footer>
        </article>
    );
}

export default ListCard;
