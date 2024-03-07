import React, { useState, useEffect } from 'react';
import ScrollMagic from 'scrollmagic';
import Navigation from "@/components/header/Navigation";

const Header = () => {
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    useEffect(() => {
        const controller = new ScrollMagic.Controller();

        const scene = new ScrollMagic.Scene({ triggerElement: "#trigger2", triggerHook: 0 }) // Триггер сработает, когда верх триггера достигнет верха окна
            .setPin("#pin2")
            .addTo(controller);

        return () => {
            scene.destroy();
        };
    }, []);

    const handleButtonClick = () => {
        setIsButtonClicked(prevState => !prevState);
    };

    return (
        <div className={`header__wrap ${isButtonClicked ? 'header__wrap-width' : ''}`}>
            <div id="trigger2" className=""></div>
            <header id="pin2" className={`header ${isButtonClicked ? 'header-width' : ''}`}>
                <Navigation onButtonClick={handleButtonClick} />
            </header>
        </div>
    );
};

export default Header;