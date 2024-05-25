import React, { useState, useEffect, useRef } from 'react';
import Images from "@/image/image";
import axios from 'axios';
import domain from "@/domain";

const LoginForm = ({ autoFocus }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showFigure, setShowFigure] = useState(window.innerWidth <= 650);
    const [error, setError] = useState(null);
    const emailInputRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setShowFigure(window.innerWidth <= 650);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (autoFocus) {
            setTimeout(() => {
                emailInputRef.current.focus();
            }, 110);
        }
    }, [autoFocus]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('username', email)
        formData.append('password', password)
        axios.post(`${domain}auth/jwt/login`, formData)
            .then(data => {
                localStorage.setItem("access_token", data.data.access_token)
                localStorage.setItem("refresh_token", data.data.refresh_token)
                window.location.href = '/table';
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setError('Неверное имя пользователя или пароль');
                } else {
                    setError('Произошла ошибка при входе. Пожалуйста, попробуйте снова позже');
                }
            });
    };

    return (
        <>
            {showFigure && (
                <figure>
                    <img src={Images.homeBackgroundMobile} alt="homeBackgroundMobile"/>
                </figure>
            )}
            <form onSubmit={handleSubmit} className="form">
                <div className="login__title">
                    Войти
                </div>
                <div className="input__wrap">
                    <input
                        ref={emailInputRef}
                        className="input"
                        type="text"
                        required
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                    />
                    <label htmlFor="email">
                        Имя пользователя
                    </label>
                </div>
                <div className="input__wrap">
                    <input
                        className="input"
                        type="password"
                        required
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                    />
                    <label htmlFor="password">
                        Пароль
                    </label>
                </div>
                {error && <div className="massage__error">{error}</div>}
                <button className="form__btn btn-hover" type="submit">
                    Войти
                </button>
            </form>
        </>
    );
};

export default LoginForm;