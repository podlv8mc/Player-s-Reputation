import React, { useState, useEffect, useRef } from 'react';
import ScrollMagic from 'scrollmagic';
import Navigation from "@/components/header/Navigation";

const Header = () => {
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const pinRef = useRef(null);
    const sceneRef = useRef(null);

    useEffect(() => {
        const controller = new ScrollMagic.Controller();

        const scene = new ScrollMagic.Scene({
            triggerElement: "body",
            triggerHook: 0,
            duration: () => pinRef.current.offsetHeight * 2 // Динамически вычисляем duration
        })
            .setPin("#pin2")
            .addTo(controller);

        // Сохраняем ссылку на сцену и контроллер
        sceneRef.current = scene;

        return () => {
            scene.destroy();
        };
    }, []);

    // Обновляем duration при изменении размера элемента
    useEffect(() => {
        if (sceneRef.current && pinRef.current) {
            sceneRef.current.duration(() => pinRef.current.offsetHeight * 2);
        }
    }, [pinRef.current]);

    const handleButtonClick = () => {
        setIsButtonClicked(prevState => !prevState);
    };

    return (
        <div className={`header__wrap ${isButtonClicked ? 'header__wrap-width' : ''}`}>
            <div id="trigger2"></div>
            {/* Сохраняем ссылку на элемент pin2 */}
            <header id="pin2" ref={pinRef} className={`header ${isButtonClicked ? 'header-width' : ''}`}>
                <Navigation onButtonClick={handleButtonClick} />
            </header>
        </div>
    );
};

export default Header;
