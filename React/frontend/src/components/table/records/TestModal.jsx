import React, { useEffect, useState } from "react";

const Modal = ({ id, activeModal, setActiveModal, children, className }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let timer;
        if (activeModal === id) {
            timer = setTimeout(() => {
                setIsVisible(true);
            }, 200);
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

const App = () => {
    const [activeModal, setActiveModal] = useState([]);

    const openModal = (id) => {
        setActiveModal((prevModalStack) => [...prevModalStack, id]);
    };

    const closeModal = () => {
        setActiveModal((prevModalStack) => {
            const newStack = prevModalStack.slice(0, -1);
            return newStack;
        });
    };

    return (
        <div>
            <button onClick={() => openModal('modal1')}>Открыть Модальное Окно 1</button>
            <button onClick={() => openModal('modal2')}>Открыть Модальное Окно 2</button>

            <Modal id="modal1" activeModal={activeModal[activeModal.length - 1]} setActiveModal={setActiveModal}>
                <h1>Модальное Окно 1</h1>
                <button onClick={closeModal}>Закрыть</button>
                <button onClick={() => openModal('modal2')}>Открыть Модальное Окно 2</button>
            </Modal>

            <Modal id="modal2" activeModal={activeModal[activeModal.length - 1]} setActiveModal={setActiveModal}>
                <h1>Модальное Окно 2</h1>
                <button onClick={closeModal}>Закрыть</button>
                <button onClick={() => openModal('modal3')}>Открыть Модальное Окно 3</button>
            </Modal>

            <Modal id="modal3" activeModal={activeModal[activeModal.length - 1]} setActiveModal={setActiveModal}>
                <h1>Модальное Окно 3</h1>
                <button onClick={closeModal}>Закрыть</button>
            </Modal>
        </div>
    );
};

export default App;