import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";
import Toast from "./Toast";

const Card = ({ user, className = "" }) => {
    const [success, setSuccess] = useState("");

    const dispatch = useDispatch();

    const { firstName, lastName, photoUrl, age, gender, about } = user;

    const handleSendRequest = (status, userId) => {
        try {
            const res = axios.post(
                BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                {
                    withCredentials: true,
                }
            );

            if (res.status === 200) {
                console.log("Request sent successfully:", res.data);
                dispatch(removeUserFromFeed(userId));
                setSuccess(res.data.message || "Request sent successfully");
                setTimeout(() => {
                    setSuccess("");
                }, 3000);
            }
        } catch (error) {
            console.error("Error sending request:", error);
        }
    };
    return (
        <div className={`card card-bordered bg-base-200 h-full ${className}`}>
            <figure className="px-6 pt-6 flex-none">
                <img
                    src={
                        photoUrl ||
                        "https://www.w3schools.com/howto/img_avatar.png"
                    }
                    alt="profile"
                    className="rounded-xl w-full h-[300px] object-cover shadow-lg"
                />
            </figure>
            <div className="card-body flex flex-col">
                <div className="flex-none">
                    <h2 className="card-title text-2xl font-bold">
                        {firstName || "First"} {lastName || "Last"}
                    </h2>
                    <p className="text-lg opacity-80">
                        {age || "0"}, {gender || "Gender"}
                    </p>
                </div>
                <div className="divider my-1"></div>
                <div className="flex-1 min-h-0 overflow-auto">
                    <h3 className="font-semibold mb-2">About</h3>
                    <p className="opacity-80 whitespace-pre-wrap">
                        {about || "No description provided."}
                    </p>
                </div>
                <div className="card-actions justify-end gap-4 flex-none mt-4">
                    <button
                        className="btn btn-primary flex-1"
                        onClick={() => handleSendRequest("ignore", user._id)}
                    >
                        Ignore
                    </button>
                    <button
                        className="btn btn-secondary flex-1"
                        onClick={() =>
                            handleSendRequest("interested", user._id)
                        }
                    >
                        Interested
                    </button>
                </div>
            </div>
            <Toast success={success} />
        </div>
    );
};

export default Card;
