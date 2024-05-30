import React from 'react';

const ModalLine = ({ children, tittle }) => {

    return (
        <div className="table__modal-row">
            <label className="table__modal-cell-title">
                {tittle}
            </label>
            {children}
        </div>
    );
};

export default ModalLine;