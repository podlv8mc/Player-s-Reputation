import React, { useEffect, useState } from "react";

const Modal = ({ id, activeModal, setActiveModal, children, className }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let timer;
        if (activeModal === id) {
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
    }, [activeModal, id]);

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    };

    const closeModal = () => {
        setActiveModal((prevModalStack) => {
            const newStack = prevModalStack.slice(0, -1);
            return newStack.length > 0 ? newStack : null;
        });
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