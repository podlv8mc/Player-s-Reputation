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
            setActiveModal(null);
        }
    };

    return (
        <div className={`modal ${isVisible ? 'active' : ''} ${className}`} onClick={() => setActiveModal(null)}>
            <div className={`modal__content ${isVisible ? 'active' : ''}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

const TestModal = () => {
    const [activeModal, setActiveModal] = useState(null);
    const [modalStack, setModalStack] = useState([]);

    const openModal = (id) => {
        if (modalStack.length > 0) {
            setModalStack([...modalStack, id]);
        } else {
            setActiveModal(id);
            setModalStack([id]);
        }
    };

    const closeModal = () => {
        const newStack = modalStack.slice(0, -1);
        setModalStack(newStack);
        if (newStack.length > 0) {
            setActiveModal(newStack[newStack.length - 1]);
        } else {
            setActiveModal(null);
        }
    };

    return (
        <div>
            <button onClick={() => openModal('modal1')}>Открыть Модальное Окно 1</button>
            <button onClick={() => openModal('modal2')}>Открыть Модальное Окно 2</button>

            <Modal id="modal1" activeModal={activeModal} setActiveModal={setActiveModal}>
                <h1>Модальное Окно 1</h1>
                <button onClick={closeModal}>Закрыть</button>
                <button onClick={() => openModal('modal2')}>Открыть Модальное Окно 2</button>
            </Modal>

            <Modal id="modal2" activeModal={activeModal} setActiveModal={setActiveModal}>
                <h1>Модальное Окно 2</h1>
                <button onClick={closeModal}>Закрыть</button>
                <button onClick={() => openModal('modal3')}>Открыть Модальное Окно 3</button>
            </Modal>

            <Modal id="modal3" activeModal={activeModal} setActiveModal={setActiveModal}>
                <h1>Модальное Окно 3</h1>
                <button onClick={closeModal}>Закрыть</button>
            </Modal>
        </div>
    );
};

export default TestModal;