import React, { useEffect, useState } from "react";

const Modal = ({ active, setActive, children, className }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [modalStack, setModalStack] = useState([]);

    useEffect(() => {
        if (active) {
            // Добавляем текущее модальное окно в стек
            setModalStack(prevStack => [...prevStack, true]);
            setIsVisible(true);
            window.addEventListener("keydown", handleKeyDown);
        } else {
            // Удаляем текущее модальное окно из стека
            setModalStack(prevStack => prevStack.slice(0, -1));
            // Проверяем, есть ли еще открытые модальные окна
            const isAnyModalActive = modalStack.length > 1;
            setIsVisible(isAnyModalActive);
            window.removeEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [active, modalStack]);

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            setActive(false);
        }
    };

    // Функция для обработки клика по фону модального окна
    const handleBackdropClick = () => {
        if (modalStack.length === 1) {
            // Закрываем текущее модальное окно только если оно единственное
            setActive(false);
        }
    };

    return (
        <div className={`modal ${isVisible ? 'active' : ''} ${className}`} onClick={handleBackdropClick}>
            <div className={`modal__content ${isVisible ? 'active' : ''}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;