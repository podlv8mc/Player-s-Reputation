import React, {useState} from "react";
import Select from "react-select";

function SelectSigns() {
    const [fundId, setFundId] = useState(1);

    const optionsFounds = [
        {value: 1, label: 'Бастион'},
        {value: 2, label: 'Пират'},
        {value: 3, label: 'wefwef'},
    ];

    const selectedOption = optionsFounds.find(option => option.value === fundId);

    const handleSelectChange = (selectedOption) => {
        setFundId(selectedOption.value);
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
