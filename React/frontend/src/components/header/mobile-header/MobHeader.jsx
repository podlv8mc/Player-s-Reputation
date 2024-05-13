import React, {useState, useEffect} from 'react';
import MobHeaderList from "@/components/header/mobile-header/MobHeaderList";
import Images from "@/image/image";
import {useLocation} from "react-router-dom";
import axios from "axios";
import domain from "@/domain";

const MobHeader = ({handleModalOpen}) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [authorization, setAuthorization] = useState(false);

    useEffect(() => {
        axios.get(`${domain}records`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then(() => {
            setAuthorization(true);
        }).catch(() => {
            setAuthorization(false);
        });
    }, [authorization]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleCloseMenu = () => {
        setIsOpen(false);
    };

    const renderLists = () => {
        if (location.pathname === "/") {
            return (
                <>
                    <MobHeaderList linkTo="home" className="globalnav" name={Images.home} alt="home" spanClass="globalnav__text"
                          text="Главная" isOpen={isOpen} onCloseMenu={handleCloseMenu}/>
                    <MobHeaderList linkTo="about" className="globalnav" name={Images.about} alt="about"
                          spanClass="globalnav__text" text="О нас" isOpen={isOpen} onCloseMenu={handleCloseMenu}/>
                    <MobHeaderList linkTo="funds" className="globalnav" name={Images.funds} alt="funds"
                          spanClass="globalnav__text" text="Фонды" isOpen={isOpen} onCloseMenu={handleCloseMenu}/>
                    <MobHeaderList linkTo="trainers" className="globalnav" name={Images.trainer} alt="trainer"
                          spanClass="globalnav__text" text="Тренера" isOpen={isOpen} onCloseMenu={handleCloseMenu}/>
                </>
            );
        } else {
            return null;
        }
    };

    return (<>
        <button type="button" className={`mob-header__btn ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <span className="burger__stick-wrap">
                    <span className="burger__stick-top">
                    </span>
                    <span className="burger__stick">
                    </span>
                    <span className="burger__stick-center">
                    </span>
                    <span className="burger__stick-bottom">
                    </span>
                </span>
        </button>
        <div className={`mob-header__wrap ${isOpen ? 'open' : ''}`}>
            <header className={`mob-header ${isOpen ? 'open' : ''}`}>
                <figure>
                    <img src={Images.homeBackgroundMobile} alt="homeBackgroundMobile"/>
                </figure>
                <nav className="mob-header__column">
                    <ul className="mob-header__list">
                        {renderLists()}
                        {
                            authorization && (location.pathname === "/table" || location.pathname === "/users" || location.pathname === "/funds" || location.pathname === "/cabinet") ? (
                                <>
                                    <MobHeaderList linkTo="/" className="globalnav globalnav-logo" name={Images.logo} alt="logo"
                                                   spanClass="globalnav__text" text="Player’s Reputation" isOpen={isOpen}/>
                                    <MobHeaderList linkTo="/table" className="globalnav" name={Images.tableNav} alt="table"
                                          spanClass="globalnav__text" text="Таблица" isOpen={isOpen}/>
                                    <MobHeaderList linkTo="/funds" className="globalnav" name={Images.funds__table}
                                          alt="funds__table" spanClass="globalnav__text" text="Фонды" isOpen={isOpen}/>
                                    <MobHeaderList linkTo="/users" className="globalnav" name={Images.users} alt="users"
                                          spanClass="globalnav__text" text="Пользователи" isOpen={isOpen}/>
                                    <MobHeaderList linkTo="/cabinet" className="globalnav" name={Images.cabinet} alt="cabinet"
                                      spanClass="globalnav__text" text="Профиль" isOpen={isOpen}/>
                                    <MobHeaderList linkTo="#" className="globalnav" name={Images.exit} alt="exit"
                                          spanClass="globalnav__text" text="Выйти" isOpen={isOpen} onClick={() => {
                                        localStorage.removeItem("access_token");
                                        localStorage.removeItem("refresh_token");
                                        window.location.href = "/";
                                    }}/>
                                </>
                            ) : (
                                authorization ? (
                                    <>
                                        <MobHeaderList linkTo="/table" className="globalnav" name={Images.tableNav} alt="table"
                                              spanClass="globalnav__text" text="Таблица" isOpen={isOpen}/>
                                        <MobHeaderList linkTo="#" className="globalnav" name={Images.exit} alt="exit"
                                              spanClass="globalnav__text" text="Выйти" isOpen={isOpen} onClick={() => {
                                            localStorage.removeItem("access_token");
                                            localStorage.removeItem("refresh_token");
                                            window.location.href = "/";
                                        }}/>
                                    </>
                                ) : (
                                    <MobHeaderList onClick={handleModalOpen} linkTo="#" className="globalnav" name={Images.login} alt="home" spanClass="globalnav__text" text="Войти" isOpen={isOpen} />
                                )
                            )
                        }
                    </ul>
                </nav>
            </header>
        </div>
    </>);
};

export default MobHeader;