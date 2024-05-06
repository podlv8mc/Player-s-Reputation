import React, {useState} from "react";
import Select from "react-select";

function SelectRole({ onSelect }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { value: 'admin', label: 'Админ' },
        { value: 'user', label: 'Пользователь' },
    ]

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        onSelect(selectedOption);
    };

    return (
        <div className="table__modal-row">
            <label className="table__modal-cell-title">
                Фонд
            </label>
            <Select
                classNamePrefix='select'
                value={selectedOption}
                onChange={handleSelectChange}
                options={options}
                placeholder="Выбрать фонд"
            />
        </div>
    );
}

export default SelectRole;