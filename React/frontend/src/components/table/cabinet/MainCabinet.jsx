import React, {useState, useEffect} from 'react';
import axios from "axios";
import ProfileInput from "@/components/table/cabinet/ProfileInput";

function MainCabinet() {
    const [cabinet, setCabinet] = useState({});
    const [loading, setLoading] = useState({});

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

    const handleChange = (key, value) => {
        setCabinet({...cabinet, [key]: value});
        setLoading({...loading, [key]: value});
    };

    return (
        <div className="profile__wrap">
            <h2 className="profile__title">
                Настройка аккаунта
            </h2>
            <form onSubmit={handleSubmit} className="profile__form-wrap">
                <ProfileInput
                    label="Имя"
                    value={cabinet.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                />
                <ProfileInput
                    label="Логин"
                    value={cabinet.username || ''}
                    onChange={(e) => handleChange('username', e.target.value)}
                    disabled
                />
                <ProfileInput
                    label="Ник в Discord"
                    value={cabinet.discord || ''}
                    onChange={(e) => handleChange('discord', e.target.value)}
                    disabled
                />
                <ProfileInput
                    label="Email"
                    value={cabinet.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    type="email"
                />
                <ProfileInput
                    label="Новый пароль"
                    value={cabinet.password || ''}
                    onChange={(e) => handleChange('password', e.target.value)}
                    type="password"
                />
                <button className="profile__btn btn-hover" type="submit">
                    Отправить
                </button>
            </form>
        </div>
    );
}

export default MainCabinet;