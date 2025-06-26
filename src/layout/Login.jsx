import React from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "../components/Input";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/auth/login",
                data,
                { withCredentials: true }
            );

            dispatch(addUser(response.data.user));
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
            // Handle error (e.g., show a notification)
        }
    };

    return (
        <div className="flex justify-center items-center mt-50">
            <div className="card card-border bg-base-300 w-96">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <h2 className="card-title justify-center">Login Form</h2>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                            },
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <>
                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="Email"
                                    className="mt-2"
                                    value={field.value}
                                    {...field}
                                />
                                {error && (
                                    <span className="text-error text-sm">
                                        {error.message}
                                    </span>
                                )}
                            </>
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message:
                                    "Password must be at least 6 characters",
                            },
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <>
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="Password"
                                    className="mt-2"
                                    value={field.value}
                                    {...field}
                                />
                                {error && (
                                    <span className="text-error text-sm">
                                        {error.message}
                                    </span>
                                )}
                            </>
                        )}
                    />
                    <div className="card-actions justify-center mt-2">
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
