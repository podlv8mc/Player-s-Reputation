import React, {useState, useEffect} from 'react';
import axios from "axios";


function MainCabinet() {
    const [cabinet, setCabinet] = useState([]);

    useEffect(() => {
        axios.get('http://213-134-31-78.netherlands.vps.ac/api/v1/users/me', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((data) => {
            setCabinet(Array.isArray(data.data.items) ? data.data.items : []);
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

    return (
        <form>
            {cabinet.map((item, i) => (
                <input
                />
            ))}
        </form>
    );
}

export default MainCabinet;