import React, { useState, useEffect } from 'react';
import Images from "@/image/image";
import List from "@/components/header/List";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Navigation = ({ onButtonClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [authorization, setAuthorization] = useState(false);

    useEffect(() => {
        axios.get('http://213-134-31-78.netherlands.vps.ac/api/v1/records', {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then(() => {
            setAuthorization(true);
        }).catch(() => {
            setAuthorization(false);
        });
    }, [authorization]);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
        onButtonClick();
    };

    const renderLists = () => {
        if (location.pathname === "/") {
            return (
                <>
                    <List linkTo="home" className="globalnav" name={Images.home} alt="home" spanClass="globalnav__text" text="Главная" isOpen={isOpen} />
                    <List linkTo="about" className="globalnav" name={Images.about} alt="about" spanClass="globalnav__text" text="О нас" isOpen={isOpen} />
                    <List linkTo="funds" className="globalnav" name={Images.funds} alt="funds" spanClass="globalnav__text" text="Фонды" isOpen={isOpen} />
                    <List linkTo="trainers" className="globalnav" name={Images.trainer} alt="trainer" spanClass="globalnav__text" text="Тренера" isOpen={isOpen} />
                </>
            );
        }
        else {
            return null;
        }
    };

    return (
        <>
            <nav className="globalnav__wrap">
                <ul className="globalnav__list">
                    <List linkTo="/" className="globalnav globalnav-logo" name={Images.logo} alt="logo" spanClass="globalnav__text" text="Player’s Reputation" isOpen={isOpen} />
                    {renderLists()}
                    {
                        authorization && (location.pathname === "/table" || location.pathname === "/Users" || location.pathname === "/Funds" || location.pathname === "/Cabinet") ? (
                            <>
                                <List linkTo="/table" className="globalnav" name={Images.tableNav} alt="table" spanClass="globalnav__text" text="Таблица" isOpen={isOpen} />
                                <List linkTo="/Funds" className="globalnav" name={Images.funds__table} alt="funds__table" spanClass="globalnav__text" text="Фонды" isOpen={isOpen} />
                                <List linkTo="/Users" className="globalnav" name={Images.users} alt="users" spanClass="globalnav__text" text="Пользователи" isOpen={isOpen} />
                                <List linkTo="/Cabinet" className="globalnav" name={Images.cabinet} alt="cabinet" spanClass="globalnav__text" text="Кабинет" isOpen={isOpen} />
                                <List linkTo="#" className="globalnav" name={Images.exit} alt="exit" spanClass="globalnav__text" text="Выйти" isOpen={isOpen} onClick={() => {
                                    localStorage.removeItem("access_token");
                                    window.location.href = "/";
                                }} />
                            </>
                        ) : (
                            authorization ? (
                                <>
                                    <List linkTo="/table" className="globalnav" name={Images.tableNav} alt="table" spanClass="globalnav__text" text="Таблица" isOpen={isOpen} />
                                    <List linkTo="#" className="globalnav" name={Images.exit} alt="exit" spanClass="globalnav__text" text="Выйти" isOpen={isOpen} onClick={() => {
                                        localStorage.removeItem("access_token");
                                        window.location.href = "/";
                                    }} />
                                </>
                            ) : (
                                <List linkTo="home" className="globalnav" name={Images.login} alt="home" spanClass="globalnav__text" text="Войти" isOpen={isOpen} />
                            )
                        )
                    }
                </ul>
            </nav>
            <button className="header__btn" onClick={handleButtonClick}>
                <svg width="10" height="18" viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M1.09327 0.692224C1.35535 0.467585 1.74991 0.497936 1.97455 0.760015L6.97455 6.59335C7.17517 6.8274 7.17517 7.17278 6.97455 7.40684L1.97455 13.2402C1.74991 13.5023 1.35535 13.5326 1.09327 13.308C0.831188 13.0833 0.800837 12.6888 1.02548 12.4267L5.67684 7.00009L1.02548 1.5735C0.800837 1.31143 0.831188 0.916863 1.09327 0.692224Z"
                          fill="white"/>
                </svg>
            </button>
        </>
    );
}

export default Navigation;