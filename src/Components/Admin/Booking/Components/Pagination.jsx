import React from "react";

function Pagination({ numbers, currentPage, changeCPage, nextPage, prePage }) {
    return (
        <div className="flex justify-center mt-6">
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px">
                    <li>
                        <a
                            onClick={prePage}
                            className={`px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                        >
                            Previous
                        </a>
                    </li>
                    {numbers?.map((res, i) => {
                        return (
                            <li key={i + (25 * 3.21) / 5}>
                                <a
                                    onClick={changeCPage}
                                    className={`px-3 py-2 ${
                                        currentPage === res
                                            ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                                            : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                    } leading-tight`}
                                >
                                    {res}
                                </a>
                            </li>
                        );
                    })}

                    <li>
                        <a
                            onClick={nextPage}
                            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;
