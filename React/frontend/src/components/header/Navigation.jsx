import React, { useState } from 'react';
import Images from "@/image/image";
import List from "@/components/header/List";

const Navigation = ({ onButtonClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
        onButtonClick(); // Вызываем функцию обработчика нажатия на кнопку
    };

    return (
        <>
            <nav className="globalnav__wrap">
                <ul className="globalnav__list">
                    <List href="#" class="globalnav globalnav-logo" name={Images.logo} alt="logo"
                          spanClass="globalnav__text" text="Player’s Reputation" isOpen={isOpen}/>
                    <List href="home" class="globalnav" name={Images.home} alt="home" spanClass="globalnav__text"
                          text="Главная" isOpen={isOpen}/>
                    <List href="about" class="globalnav" name={Images.about} alt="about" spanClass="globalnav__text"
                          text="О нас" isOpen={isOpen}/>
                    <List href="about" class="globalnav" name={Images.funds} alt="funds" spanClass="globalnav__text"
                          text="Фонды" isOpen={isOpen}/>
                    <List href="contact" class="globalnav" name={Images.trainer} alt="trainer"
                          spanClass="globalnav__text" text="Тренера" isOpen={isOpen}/>
                    <List href="#" class="globalnav" name={Images.exit} alt="exit" spanClass="globalnav__text"
                          text="Выйти" isOpen={isOpen}/>
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
