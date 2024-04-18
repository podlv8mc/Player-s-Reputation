import React, {useState} from 'react';
import '@styles/index.scss';
import ResizableHeader from "@/components/ResizableHeader";
import Main from "@/components/main/Main";
import LoginForm from "@/components/main/forms/LoginForm";
import Modal from "@/components/main/modal/Modal";

function HomePage() {
    const [modalActive, setModalActive] = useState(false);

    const handleModalOpen = () => {
        setModalActive(true);
    };

    const handleModalClose = () => {
        setModalActive(false);
    };

    return (
        <div className="App">
            <ResizableHeader handleModalOpen={handleModalOpen} />
            <Main handleModalOpen={handleModalOpen}/>
            <Modal active={modalActive} setActive={handleModalClose}>
                <button className="modal__btn-close" onClick={handleModalClose}></button>
                <LoginForm/>
            </Modal>
        </div>
    );
}

export default HomePage;