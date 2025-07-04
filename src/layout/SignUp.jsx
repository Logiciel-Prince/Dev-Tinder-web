import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "../components/Input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const SignUp = () => {
    const { control, handleSubmit, watch } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            age: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const navigate = useNavigate();
    const [error, setError] = useState("");

    const onSubmit = async (data) => {
        try {
            console.log("Form Data:", data);
            if (data.password !== data.confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            await axios.post(
                BASE_URL + "/auth/signup",
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    age: data.age,
                    email: data.email,
                    password: data.password,
                },
                {
                    withCredentials: true,
                }
            );

            navigate("/login");
        } catch (error) {
            setError(error.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div className="flex justify-center items-center mt-20">
            <div className="card card-border bg-base-300 w-96">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <h2 className="card-title justify-center">Sign Up Form</h2>
                    <Controller
                        name="firstName"
                        control={control}
                        rules={{
                            required: "First name is required",
                            minLength: {
                                value: 2,
                                message:
                                    "First name must be at least 2 characters",
                            },
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <>
                                <Input
                                    label="First Name"
                                    type="text"
                                    placeholder="First Name"
                                    className="mt-2"
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
                        name="lastName"
                        control={control}
                        rules={{
                            required: "Last name is required",
                            minLength: {
                                value: 2,
                                message:
                                    "Last name must be at least 2 characters",
                            },
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <>
                                <Input
                                    label="Last Name"
                                    type="text"
                                    placeholder="Last Name"
                                    className="mt-2"
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
                        name="age"
                        control={control}
                        rules={{
                            required: "age is required",
                            min: {
                                value: 18,
                                message: "Age must be at least 18",
                            }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <>
                                <Input
                                    label="Age"
                                    type="number"
                                    placeholder="Age"
                                    className="mt-2"
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
                        name="confirmPassword"
                        control={control}
                        rules={{
                            required: "Please confirm your password",
                            validate: (value) =>
                                value === watch("password") ||
                                "Passwords do not match",
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <>
                                <Input
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="mt-2"
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

                    {error && (
                        <span className="text-error text-sm mt-2">{error}</span>
                    )}
                    <div className="card-actions justify-center mt-2">
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                        >
                            Sign Up
                        </button>

                        <span className="text-sm text-center mt-2 text-gray-500">
                            Already have an account?
                            <Link
                                to="/login"
                                className="text-primary font-bold"
                            >
                                {" "}
                                Login
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
