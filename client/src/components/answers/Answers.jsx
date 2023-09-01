import React from 'react';
import './answers.css';

const Answer = ({answer,userName,profile,answered_date}) => {
    return (
        <div>
            <hr />
            <div className="d-md-flex align-items-center justify-space-between">
                <div className="d-flex flex-md-column">
                    <img
                        className="avatar"
                        src={profile}
                        alt="User Avatar"
                    />
                    <h6 className="align-self-center ms-2 ms-md-0">{userName}</h6>
                </div>
                <div className="ms-md-5">
                    <h6 className="pt-2 pt-md-0">
                       {answer}
            </h6>
            <time>{answered_date}</time>
                </div>
            </div>
        </div>
    )
}

export default Answer;