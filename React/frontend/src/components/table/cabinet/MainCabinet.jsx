import React, {useState, useEffect} from 'react';
import axios from "axios";


function MainCabinet() {
    const [cabinet, setCabinet] = useState({});

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
                    alert("Авторизируйтесь!")
                    window.location.href = "/"
                })
        })
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(cabinet)
    };

    return (
        <form onSubmit={handleSubmit} className="profile__form-wrap">
            <div className="profile__form">
                <label className="profile__form-title" htmlFor="login">
                    Логин
                </label>
                <input
                    className="profile__form-input"
                    id="login"
                    value={cabinet.username}
                    onChange={(e) => {
                        setCabinet({...cabinet, username:e.target.value})
                    }}
                    autoComplete="off"
                />
            </div>

            <button className="form__btn btn-hover" type="submit">
                Отправить
            </button>
        </form>
    );
}

export default MainCabinet;