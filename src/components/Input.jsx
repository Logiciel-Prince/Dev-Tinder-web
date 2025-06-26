import React from "react";

const Input = ({ label, type, placeholder, className, value, ...props }) => {
    return (
        <div>
            <label className="floating-label">
                <span>{label}</span>
                <input
                    type={type}
                    placeholder={placeholder}
                    className={`input w-full ${className}`}
                    value={value}
                    {...props}
                />
            </label>
        </div>
    );
};

export default Input;
