import React, { useState } from "react";

function ReviewAddComponent({ handleSubmitReview }) {
    const [rating, setRating] = useState(-1);
    const [text, setText] = useState("");
    return (
        <div>
            <div className="pt-10 pb-10 shadow-sm">
                <h2 className="text-3xl font-bold text-lime-600">Write a review</h2>
                <div className="flex flex-col py-6 space-y-3">
                    <span className="">How was your experience?</span>
                    <div className="flex space-x-3">
                        {Array(5)
                            .fill("")
                            .map((e, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setRating(index + 1)}
                                    title="Rate 5 stars"
                                    aria-label="Rate 5 stars"
                                >
                                    <svg
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className={`w-5 h-5 ${
                                            index < rating ? "text-orange-400" : "text-gray-600"
                                        } text-gray-600`}
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                </button>
                            ))}
                    </div>
                </div>
                <div className="flex flex-col w-10/12">
                    <textarea
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        rows="3"
                        placeholder="Message..."
                        className="p-2 resize-none border-none bg-gray-200"
                    ></textarea>
                    <button
                        onClick={() => handleSubmitReview({ rating, text })}
                        type="button"
                        className="py-2 my-8 w-fit px-3 uppercase font-semibold text-white bg-amber-500"
                    >
                        Submit review
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReviewAddComponent;
