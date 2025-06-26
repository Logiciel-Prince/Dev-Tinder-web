import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Body = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios( BASE_URL + "/profile/view", {
                withCredentials: "true",
            });

            dispatch(addUser(response.data));
        } catch (error) {
            console.error("Error fetching user data:", error.response.status);
            if (error.response && error.response.status === 401) {
                // If the user is not authenticated, redirect to login
                navigate("/login");
            }
            navigate("/login");
            return null;
        }
    };
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
};

export default Body;
