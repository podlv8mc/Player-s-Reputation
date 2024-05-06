import React, {useState} from 'react';
import Images from "@/image/image";

const ProfileInput = ({label, value, onChange, type = 'text', disabled = false}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="profile__form">
            <label className="profile__form-title" htmlFor={label.toLowerCase()}>
                {label}
            </label>
            <input
                type={showPassword ? 'text' : type}
                disabled={disabled}
                className="profile__form-input"
                id={label.toLowerCase()}
                value={value}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                autoComplete="off"
            />
            {type === 'password' && (
                <button
                    type="button"
                    className="profile__password-toggle"
                    onClick={togglePasswordVisibility}
                >
                    <img src={showPassword ? Images.eyeOff : Images.eye} alt="eye" />
                </button>
            )}
        </div>
    );
}

export default ProfileInput;