import React from "react";

function BreadCrumbComponent({ title }) {
    return (
        <nav
            className="relative flex flex-wrap items-center justify-between py-3 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:flex-wrap lg:justify-start"
            data-te-navbar-ref
        >
            <div className="flex w-full flex-wrap items-center justify-between px-3">
                <nav className="bg-grey-light w-full rounded-md" aria-label="breadcrumb">
                    <ol className="list-reset flex">
                        <li>
                            <a className="text-neutral-500 hover:text-neutral-600 dark:text-neutral-200">Home</a>
                        </li>
                        <li>
                            <span className="mx-2 text-neutral-500 dark:text-neutral-200">/</span>
                        </li>
                        <li>
                            <a className="text-neutral-500 hover:text-neutral-600 dark:text-neutral-200">Account</a>
                        </li>
                        <li>
                            <span className="mx-2 text-neutral-500 dark:text-neutral-200">/</span>
                        </li>
                        <li>
                            <a className="text-neutral-500 hover:text-neutral-600 dark:text-neutral-200">{title}</a>
                        </li>
                    </ol>
                </nav>
            </div>
        </nav>
    );
}

export default BreadCrumbComponent;
