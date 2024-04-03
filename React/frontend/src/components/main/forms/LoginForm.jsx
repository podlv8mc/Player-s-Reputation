import React, {useState, useEffect} from 'react';
import Images from "@/image/image";
import axios from 'axios';
import {document} from "postcss"; // Импортируем axios

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showFigure, setShowFigure] = useState(window.innerWidth <= 650);
    const [error, setError] = useState(null);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('username', email)
        formData.append('password', password)
        axios.post('http://213-134-31-78.netherlands.vps.ac/api/v1/auth/jwt/login', formData).then(data => {
            console.log(data.data)
            localStorage.setItem("access_token", data.data.access_token)
            window.location.href = '/table';
        })
        console.log('Login successful!');


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
                {error && <div className="error-message">{error}</div>}


                        <button className="form__btn btn-hover" type="submit">
                            Войти
                        </button>


            </form>
        </>
    );
};

export default LoginForm;