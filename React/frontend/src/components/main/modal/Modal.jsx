import React, { useEffect, useState } from "react";

const Modal = ({ active, setActive, children, className }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let timer;
        if (active) {
            timer = setTimeout(() => {
                setIsVisible(true);
            }, 170);
            window.addEventListener("keydown", handleKeyDown);
        } else {
            setIsVisible(false);
        }

        return () => {
            clearTimeout(timer);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [active]);

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            setActive(false);
        }
    };

    return (
        <div className={`modal ${isVisible ? 'active' : ''} ${className}`} onClick={() => setActive(false)}>
            <div className={`modal__content ${isVisible ? 'active' : ''}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;