import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Connections = () => {
    const [connections, setConnections] = useState([]);

    useEffect(() => {
        fetchConnections();
    }, []);

    const fetchConnections = async () => {
        try {
            const response = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true,
            });

            setConnections(response.data.data);
        } catch (error) {
            console.error("Error fetching connections:", error);
        }
    };

    return (
        <div className="text-center mt-10">
            <h1 className="text-3xl font-bold">Connections</h1>
            {connections && connections.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                    {connections.map((user) => (
                        <div
                            key={user._id}
                            className="card bg-base-100 shadow-xl"
                        >
                            <figure className="px-10 pt-10">
                                <img
                                    src={
                                        user.photoUrl ||
                                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                    }
                                    alt="User"
                                    className="rounded-xl w-32 h-32 object-cover"
                                />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">
                                    {user.firstName} {user.lastName}
                                </h2>
                                {user?.age && user?.gender && (
                                    <p>
                                        {user.age}, {user.gender}
                                    </p>
                                )}
                                <p>{user.about || "No bio available"}</p>
                                <div className="card-actions">
                                    <button className="btn btn-primary">
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No connections found.</p>
            )}
        </div>
    );
};

export default Connections;
