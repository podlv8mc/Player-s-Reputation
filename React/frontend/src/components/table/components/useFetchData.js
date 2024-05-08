import { useEffect } from 'react';
import axios from 'axios';
import domain from "@/domain";

function useFetchData(setData, setTotal, continuation) {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${domain}${continuation}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                    }
                });
                setData(Array.isArray(response.data.items) ? response.data.items : []);
                setTotal(response.data.total);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    try {
                        const refreshResponse = await axios.post(`${domain}auth/jwt/refresh`, null, {
                            headers: {
                                'refresh-token': `${localStorage.getItem("refresh_token")}`,
                            }
                        });
                        localStorage.setItem("access_token", refreshResponse.data.access_token);
                        localStorage.setItem("refresh_token", refreshResponse.data.refresh_token);
                        await fetchData(); // Повторный вызов fetchData после успешного обновления токена
                    } catch (error) {

                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'authorization__wrap';
                        errorMessage.textContent = 'Авторизируйтесь!';
                        document.body.appendChild(errorMessage);

                        setTimeout(() => {
                            window.location.href = "/";
                        }, 2000);
                    }
                } else {

                }
            }
        };

        fetchData(); // Вызываем fetchData при монтировании

        // Возвращаем пустую функцию, которая будет вызвана при размонтировании
        return () => {};
    }, [setData, setTotal, continuation]);
}

export default useFetchData;