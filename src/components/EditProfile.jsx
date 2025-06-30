import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "./Input";
import Card from "./Card";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
    const { control, handleSubmit, watch } = useForm({
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            photoUrl: user?.photoUrl || "",
            age: user?.age || "",
            gender: user?.gender || "",
            about: user?.about || "",
        },
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const formValues = watch();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        setError("");
        try {
            const updatedUser = await axios.put(
                BASE_URL + "/profile/update",
                data,
                {
                    withCredentials: true,
                }
            );

            dispatch(addUser(updatedUser.data.user));
            setSuccess(updatedUser.data.message);
            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } catch (error) {
            console.error("Error updating profile:", error);
            setError(error.response?.data?.error || "Update failed");
        }
    };
    return (
        <>
            <div className="container mx-auto px-4 py-10">
                <div className="flex flex-col md:flex-row justify-center gap-8 items-stretch">
                    <div className="card card-bordered shadow-xl bg-base-200 w-96 self-stretch overflow-auto">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="card-body"
                        >
                            <h2 className="card-title justify-center">
                                Edit Profile
                            </h2>
                            <Controller
                                name="firstName"
                                control={control}
                                rules={{
                                    required: "first is required",
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
                                    required: "last name is required",
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
                                name="photoUrl"
                                control={control}
                                rules={{
                                    required: "photoUrl is required",
                                    pattern: {
                                        value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/,
                                        message: "Invalid photo URL",
                                    },
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <>
                                        <Input
                                            label="photoUrl"
                                            type="text"
                                            placeholder="Photo URL"
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
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <>
                                        <Input
                                            label="age"
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
                                name="gender"
                                control={control}
                                rules={{
                                    required: "gender is required",
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <>
                                        <Input
                                            label="gender"
                                            type="text"
                                            placeholder="Gender"
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
                                name="about"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <>
                                        <Input
                                            label="about"
                                            type="text"
                                            placeholder="About"
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
                                <span className="text-error text-sm mt-2">
                                    {error}
                                </span>
                            )}

                            <div className="card-actions justify-center mt-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full"
                                >
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                    <Card
                        user={formValues}
                        className="w-96 self-stretch shadow-xl"
                    />
                </div>
            </div>
            { success && <div className="toast toast-top toast-end">
                <div className="alert alert-success">
                    <span>{success}</span>
                </div>
            </div>}
        </>
    );
};

export default EditProfile;
