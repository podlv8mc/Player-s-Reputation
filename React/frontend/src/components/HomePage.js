import React, { useEffect, useState } from 'react';
import '@styles/index.scss';
import Header from "@/components/header/Header";
import Main from "@/components/main/Main";
import MobHeader from "@/components/header/mobile-header/MobHeader";
import axios from "axios";

function HomePage() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const url1 = "http://213-134-31-78.netherlands.vps.ac/api/v1/records";
    axios.get(url1, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }
    }).then((response) => {
        console.log(response.data);
    })
        .catch((error) => {
            console.error(error);
        })


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };


        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="App">
            {windowWidth >= 801 ? (
                <Header />
            ) : (
                <MobHeader />
            )}
            <Main />
        </div>
    );
}

export default HomePage;
