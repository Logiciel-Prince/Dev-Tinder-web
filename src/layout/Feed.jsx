import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import Card from "../components/Card";

const Feed = () => {
    const feed = useSelector((state) => state.feed);
    const dispatch = useDispatch();

    const fetchFeed = async () => {
        try {
            if (feed) return;
            const response = await axios.get(BASE_URL + "/user/feed", {
                withCredentials: true,
            });

            dispatch(addFeed(response?.data?.feed));
        } catch (error) {
            console.error("Error fetching feed:", error);
        }
    };

    useEffect(() => {
        fetchFeed();
    }, []);

    return (
        feed &&
        feed.length > 0 && (
            <div className="flex items-center justify-center mt-10">
                {feed?.map((user) => (
                    <Card key={user._id} user={user} />
                ))}
            </div>
        )
    );
};

export default Feed;
