import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FindReviewReqApi } from "../../../API/Services/TurfAdminRequest";
import Loader from "../Layout/Loader";
import CardComponent from "./Components/CardComponent";

function ReviewComponent() {
    const token = useSelector((state) => state.turfAdminLogin.token);
    const [reviewFetch, setReviewFetch] = useState([]);
    const [loader, setLoader] = useState(false);
    const findReview = async () => {
        setLoader(true);
        const response = await FindReviewReqApi(token);
        if (response.status === 201) {
            setReviewFetch(response.data.result);
            setLoader(false);
        }
    };

    useEffect(() => {
        if (token) {
            findReview();
        }
    }, [token]);

    return (
        <div className="w-11/12">
            {loader && <Loader />}
            <div className="text-2xl font-bold text-lime-600 mt-10 ms-10 mb-5">Reviews</div>
            <div className="grid grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
                {reviewFetch.length > 0 ? (
                    <>
                        {reviewFetch?.map((res) => {
                            return (
                                <div className="p-10" key={res._id}>
                                    <CardComponent reviewFetch={res} />
                                </div>
                            );
                        })}
                    </>
                ) : (
                    <div className="mx-auto">No Review has been found</div>
                )}
            </div>
        </div>
    );
}

export default ReviewComponent;
