import React from "react";

const Toast = ({ success }) => {
    return (
        <div className="toast toast-top toast-end">
            <div className="alert alert-success">
                <span>{success}</span>
            </div>
        </div>
    );
};

export default Toast;
