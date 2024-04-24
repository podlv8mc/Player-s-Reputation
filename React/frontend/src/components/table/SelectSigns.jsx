import React, { useState } from "react";
import Select from "react-select";

function SelectSigns() {
    const [fundId, setFundId] = useState(1);

    const optionsFounds = [
        { value: 1, label: 'Бастион' },
        { value: 2, label: 'Пират' },
        { value: 3, label: 'Пйцкйцкйират' },
    ];

    const handleSelectChange = (selectedOption) => {
        setFundId(selectedOption.value);
    };

    return (
        <div className="table__modal-row">
            <label className="table__modal-cell-title">
                Фонд
            </label>
            <Select
                classNamePrefix='select'
                value={fundId}
                onChange={handleSelectChange}
                options={optionsFounds}
            />
        </div>
    );
}

export default SelectSigns;
