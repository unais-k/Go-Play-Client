import React, { useEffect, useState } from "react";
import Pagination from "../Components/Pagination";
function ReviewComponent({ numbers, currentPage, changeCPage, nextPage, prePage, moveToReview, review }) {
    return (
        <div>
            <div ref={moveToReview} className="text-2xl font-bold text-lime-600 mt-10 mb-5">
                Reviews
            </div>
            <article>
                {review.length > 0 ? (
                    <>
                        {review.map((res) => {
                            return (
                                <>
                                    <div className="flex items-center mb-4 space-x-4 mt-4">
                                        <div className="space-y-1 font-medium dark:text-white">
                                            <p>
                                                {res.client.name}
                                                <time
                                                    datetime="2014-08-16 19:00"
                                                    className="block text-sm text-gray-500 dark:text-gray-400"
                                                >
                                                    Joined on {new Date(res.client.createdAt).toDateString()}
                                                </time>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center mb-1">
                                        {Array(5)
                                            .fill("")
                                            .map((e, index) => {
                                                return (
                                                    <span key={index}>
                                                        <svg
                                                            aria-hidden="true"
                                                            className={`w-5 h-5  ${
                                                                index < res.rating ? "text-yellow-400" : "text-gray-400"
                                                            }`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                        </svg>
                                                    </span>
                                                );
                                            })}
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400">{res.review}</p>
                                </>
                            );
                        })}
                    </>
                ) : (
                    <>No Reviews....</>
                )}
            </article>
            {review.length > 3 ? (
                <Pagination
                    nextPage={nextPage}
                    changeCPage={changeCPage}
                    numbers={numbers}
                    currentPage={currentPage}
                    prePage={prePage}
                />
            ) : (
                <></>
            )}
        </div>
    );
}

export default ReviewComponent;
