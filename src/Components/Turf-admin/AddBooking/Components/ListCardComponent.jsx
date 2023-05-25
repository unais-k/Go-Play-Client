import React from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

function ListCardComponent({ res, event }) {
    return (
        <article className="h-80 w-96 overflow-hidden rounded-lg shadow-lg">
            <div className="h-60">
                <img alt="Placeholder" className="block h-full w-full" src={res.images} />
            </div>

            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 className="text-lg">
                    <a className="no-underline hover:underline text-black" href="#">
                        {res.name}
                    </a>
                </h1>
                <p className="text-grey-darker text-sm">{res.place}</p>
            </header>
        </article>
    );
}

export default ListCardComponent;
