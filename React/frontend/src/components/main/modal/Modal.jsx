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
            console.log(`Модальное окно ${id} открыто`);
        } else {
            setIsVisible(false);
            console.log(`Модальное окно ${id} закрыто`);
        }

        return () => {
            clearTimeout(timer);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [active, id]);

    useEffect(() => {
        if (active) {
            const stack = JSON.parse(localStorage.getItem("modalStack")) || [];
            stack.push(id);
            localStorage.setItem("modalStack", JSON.stringify(stack));
            console.log(`Модальное окно ${id} добавлено в стек`);
        }
    }, [active, id]);

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            setActive(false);
            console.log(`Нажата клавиша Escape для закрытия модального окна ${id}`);
        }
    };

    const closeModal = () => {
        const stack = JSON.parse(localStorage.getItem("modalStack")) || [];
        const index = stack.indexOf(id);
        if (index !== -1) {
            stack.splice(index, 1);
            localStorage.setItem("modalStack", JSON.stringify(stack));
            console.log(`Модальное окно ${id} удалено из стека`);
        }
        setActive(false);
        console.log(`Модальное окно ${id} закрыто`);
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
