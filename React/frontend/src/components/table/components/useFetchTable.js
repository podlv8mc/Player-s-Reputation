import { useEffect } from 'react';
import axios from 'axios';
import domain from "@/domain";

function useFetchTable(setTotal, continuation) {
    useEffect(() => {
        axios.get(`${domain}${continuation}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((data) => {
            setTotal(data.data.total)

        }).catch(() => {
            axios.post(`${domain}auth/jwt/refresh`, null, {
                headers: {
                    'refresh-token': `${localStorage.getItem("refresh_token")}`,
                }
            })
                .then((response) => {
                    localStorage.setItem("access_token", data.data.access_token)
                    localStorage.setItem("refresh_token", data.data.refresh_token)
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
    }, [setTotal, continuation]);
}

export default useFetchTable;
