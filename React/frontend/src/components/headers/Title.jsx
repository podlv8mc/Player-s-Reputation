import React, { useState, useEffect } from 'react';
import Modal from "@/components/main/modal/Modal";
import LoginForm from "@/components/main/forms/LoginForm";

const Title = () => {
    const [modalActive, setModalActive] = useState(false);
    const [bodyClass, setBodyClass] = useState('');

    useEffect(() => {
        if (bodyClass) {
            document.body.classList.add(bodyClass);
        }

        return () => {
            if (bodyClass) {
                document.body.classList.remove(bodyClass);
            }
        };
    }, [bodyClass]);


    const handleModalOpen = () => {
        setModalActive(true);
        setBodyClass('modal-index');
    };

    const handleModalClose = () => {
        setModalActive(false);
        setBodyClass('');
    };

    return (
        <div className="title__wrap">
            <h1>
                Бекинговый фондр
            </h1>
            <p className="title__text">
                Организация, которая предоставляет обучение и финансирование игрокам в покер
            </p>
            <button onClick={handleModalOpen} type="button" className="btn-hover title__btn">
                Войти
            </button>
            <Modal active={modalActive} setActive={handleModalClose}>
                <button className="modal__btn-close" onClick={handleModalClose}></button>
                <LoginForm/>
            </Modal>
        </div>
    );
};

export default Title;
