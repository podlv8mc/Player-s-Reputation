import React, { useEffect, useState } from "react";

const Modal = ({ id, active, setActive, children, className }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let timer;
        if (active) {
            timer = setTimeout(() => {
                setIsVisible(true);
            }, 100);
            window.addEventListener("keydown", handleKeyDown);
        } else {
            setIsVisible(false);
        }

        return () => {
            clearTimeout(timer);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [active]);

    useEffect(() => {
        if (active) {
            const stack = JSON.parse(localStorage.getItem("modalStack")) || [];
            stack.push(id);
            localStorage.setItem("modalStack", JSON.stringify(stack));
        }
    }, [active, id]);

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            setActive(false);
        }
    };

    const closeModal = () => {
        const stack = JSON.parse(localStorage.getItem("modalStack")) || [];
        const index = stack.indexOf(id);
        if (index !== -1) {
            stack.splice(index, 1);
            localStorage.setItem("modalStack", JSON.stringify(stack));
        }
        setActive(false);
    };

    return (
        <div className={`modal ${isVisible ? 'active' : ''} ${className}`} onClick={closeModal}>
            <div className={`modal__content ${isVisible ? 'active' : ''}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;