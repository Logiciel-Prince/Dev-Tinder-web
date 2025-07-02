import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import Toast from "../components/Toast";

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await axios.get(BASE_URL + "/user/requests", {
                withCredentials: true,
            });

            setRequests(response?.data?.requests);
            console.log("Requests:", response?.data?.requests);
        } catch (error) {
            console.error("Error fetching connections:", error);
        }
    };

    const reviewRequest = async (requestId, action) => {
        try {
            const response = await axios.post(BASE_URL + `/request/review/${action}/${          requestId}`,
                {},
                { withCredentials: true }
            );

            setSuccess(response?.data?.message);
            setTimeout(() => {
                setSuccess("");
            }, 3000);

            fetchRequests();
        } catch (error) {
            console.error("Error handling request:", error);
        }
    };

    return (
        <div className="text-center mt-10">
            <h1 className="text-3xl font-bold">Requests</h1>
            {requests && requests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                    {requests.map((user) => {
                        const { _id, firstName, lastName, photoUrl, age, gender, about } = user.sender;
                        return (
                            <div key={_id} className="card bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img
                                        src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                        alt="User"
                                        className="rounded-xl w-32 h-32 object-cover"
                                    />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title">
                                        {firstName} {lastName}
                                    </h2>
                                    {age && gender && (
                                        <p>
                                            {age}, {gender}
                                        </p>
                                    )}
                                    <p>{about || "No bio available"}</p>
                                    <div className="card-actions">
                                        <button className="btn btn-secondary"
                                            onClick={() => reviewRequest(user._id, "accepted")}
                                        >
                                            Accept
                                        </button>
                                        <button className="btn btn-primary"
                                            onClick={() => reviewRequest(user._id, "rejected")}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>No Request found.</p>
            )}

            {success && <Toast success={success} />}
        </div>
    );
};

export default Requests;
