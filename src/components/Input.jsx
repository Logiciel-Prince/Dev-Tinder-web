import React from "react";

const Input = ({ label, type, placeholder, className, value, ...props }) => {
    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text font-medium">{label}</span>
            </label>
            <input
                type={type}
                placeholder={placeholder}
                className={`input input-bordered bg-base-100 w-full focus:outline-none focus:ring-2 focus:ring-primary/20 ${className}`}
                value={value}
                {...props}
            />
        </div>
    );
};

export default Input;
