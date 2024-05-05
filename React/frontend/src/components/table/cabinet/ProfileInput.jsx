import React from 'react';

const ProfileInput = ({ label, value, onChange, type = 'text', disabled = false }) => {
    return (
        <div className="profile__form">
            <label className="profile__form-title" htmlFor={label.toLowerCase()}>
                {label}
            </label>
            <input
                type={type}
                disabled={disabled}
                className="profile__form-input"
                id={label.toLowerCase()}
                value={value}
                onChange={onChange}
                autoComplete="off"
            />
        </div>
    );
}

export default ProfileInput;
