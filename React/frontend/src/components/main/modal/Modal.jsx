import React from "react";

const Modal = ({ active, setActive, children, className }) => {
    return (
        <div className={`modal ${active ? 'active' : ''} ${className}`} onClick={() => setActive(false)}>
            <div className={`modal__content ${active ? 'active' : ''}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;