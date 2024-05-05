import React, {useState, useEffect} from 'react';
import axios from "axios";


function MainCabinet() {
    const [cabinet, setCabinet] = useState({});
    const [loading, setLoading] = useState({is_active: true, is_superuser: true, is_verified: true, role: "admin"});

    useEffect(() => {
        axios.get('http://213-134-31-78.netherlands.vps.ac/api/v1/users/me', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((data) => {
            setCabinet(data.data)
        }).catch(() => {
            axios.post("http://213-134-31-78.netherlands.vps.ac/api/v1/auth/jwt/refresh", null, {
                headers: {
                    'refresh-token': `${localStorage.getItem("refresh_token")}`,

                }
            })
                .then((response) => {
                    localStorage.setItem("access_token", response.data.access_token)
                    localStorage.setItem("refresh_token", response.data.refresh_token)
                })
                .catch((error) => {
                    console.error(error);
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'authorization__wrap';
                    errorMessage.textContent = 'Авторизируйтесь!';
                    document.body.appendChild(errorMessage);

                    setTimeout(() => {
                        window.location.href = "/";
                    }, 2000);
                })
        })
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(loading)
        await axios.patch('http://213-134-31-78.netherlands.vps.ac/api/v1/users/me', loading, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((data) => {
            console.log(data)
        })
            .catch((error) => {
                console.log(error)
            })
    };

    return (
        <>
            <h3>
                Настройка аккаунта
            </h3>
            <form onSubmit={handleSubmit} className="profile__form-wrap">
                <div className="profile__form">
                    <label className="profile__form-title" htmlFor="login">
                        Логин
                    </label>
                    <input
                        disabled
                        className="profile__form-input"
                        id="login"
                        value={cabinet.username}
                        onChange={(e) => {
                            setCabinet({...cabinet, username: e.target.value})
                        }}
                        autoComplete="off"
                    />
                </div>

                <div className="profile__form">
                    <label className="profile__form-title" htmlFor="discord">
                        Ник в Discord
                    </label>
                    <input
                        disabled
                        className="profile__form-input"
                        id="discord"
                        value={cabinet.discord}
                        onChange={(e) => {
                            setCabinet({...cabinet, discord: e.target.value})
                        }}
                        autoComplete="off"
                    />
                </div>

                <div className="profile__form">
                    <label className="profile__form-title" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="profile__form-input"
                        id="email"
                        value={cabinet.email}
                        onChange={(e) => {
                            setCabinet({...cabinet, email: e.target.value})
                            setLoading({...loading, email: e.target.value})
                        }}
                        autoComplete="off"
                    />
                </div>

                <div className="profile__form">
                    <label className="profile__form-title" htmlFor="password">
                        Новый пароль
                    </label>
                    <input
                        className="profile__form-input"
                        id="password"
                        value={cabinet.password}
                        onChange={(e) => {
                            setCabinet({...cabinet, password: e.target.value})
                            setLoading({...loading, password: e.target.value})
                        }}
                        autoComplete="off"
                    />
                </div>

                <button className="profile__btn btn-hover" type="submit">
                    Отправить
                </button>
            </form>
        </>
    );
}

export default MainCabinet;