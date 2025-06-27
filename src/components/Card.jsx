import React from "react";

const Card = ({ user }) => {

    const { firstName, lastName, photoUrl, age, gender, about } = user;
    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        src={user.photoUrl}
                        alt="photo"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    {age && gender && <p className="text-sm text-gray-500">
                        {age}, {gender}
                    </p>}
                    <p>
                        {about}
                    </p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
