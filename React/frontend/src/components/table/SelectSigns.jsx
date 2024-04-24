import React, { useState } from "react";
import Select from "react-select";

const SelectSigns = () => {
    const [fundId, setFundId] = useState(1);

    const optionsFounds = [
        { value: 1, label: 'Бастион' },
        { value: 2, label: 'Пират' },
    ];

    const handleSelectChange = (selectedOption) => {
        setFundId(selectedOption.value);
        console.log(typeof fundId);
    };

    return (
        <div className="table__modal-row">
            <label className="table__modal-cell-title">Fund ID</label>
            <Select
                classNamePrefix='select'
                value={optionsFounds.find(option => option.value === fundId)}
                onChange={handleSelectChange}
                options={optionsFounds}
                inputValue=""
                onInputChange={() => {}}
                onMenuClose={() => {}}
                onMenuOpen={() => {}}
            />
        </div>
    );
};

export default SelectSigns;
