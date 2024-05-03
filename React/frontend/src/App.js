import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "@/components/HomePage";
import Table from "@/components/table/Table";
import Users from "@/components/table/users/Users";
import Funds from "@/components/table/funds/Funds";
//import Cabinet from "@/components/table/cabinet/Cabinet";
//import Loader from "@/components/loader/Loader";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Component App mounted'); // Лог при монтировании компонента

        const handleLoad = () => {
            console.log('Window loaded'); // Лог при полной загрузке страницы
            setLoading(false); // Помечаем, что загрузка завершена
        };

        window.addEventListener('load', handleLoad); // Добавляем слушатель события загрузки

        return () => {
            console.log('Component App unmounted'); // Лог при размонтировании компонента
            window.removeEventListener('load', handleLoad); // Очищаем слушатель при размонтировании компонента
        };
    }, []);

    useEffect(() => {
        console.log('Loading status changed:', loading ? 'loading...' : 'finished'); // Лог изменения статуса загрузки
    }, [loading]); // Лог при каждом изменении статуса загрузки

    return (
        <>
        {loading ? <div className="hidden"></div> : null}
            <Routes>
                <Route exact path="/" element={<HomePage/>}/>
                <Route path="/table" element={<Table/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/funds" element={<Funds/>}/>
                {/*<Route path="/cabinet" element={<cabinet />} />*/}
            </Routes>
        </>
    );
}

export default App;
