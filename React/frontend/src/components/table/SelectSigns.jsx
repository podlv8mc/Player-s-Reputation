import React, { useState } from "react";
import Select from "react-select";

function SelectSigns() {
    const [selectedOption, setSelectedOption] = useState({ value: 1, label: 'Бастион' });

    const optionsFounds = [
        { value: 1, label: 'Бастион' },
        { value: 2, label: 'Пират' },
    ];

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    return (
        <div className="table__modal-row">
            <label className="table__modal-cell-title">Fund ID</label>
            <Select
                classNamePrefix='select'
                value={selectedOption}
                onChange={handleSelectChange}
                options={optionsFounds}
            />
        </div>
    );
}

export default SelectSigns;
