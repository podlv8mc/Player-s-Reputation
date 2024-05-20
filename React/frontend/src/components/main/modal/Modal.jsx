import React, { useEffect } from "react";

const Modal = ({ active, setActive, children, className }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setActive(false);
            }
        };

        if (active) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [active, setActive]);

    return (
        <div className={`modal ${active ? 'active' : ''} ${className}`} onClick={() => setActive(false)}>
            <div className={`modal__content ${active ? 'active' : ''}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;
