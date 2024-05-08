import React, {useState} from "react";
import Select from "react-select";

function SelectRole({ onSelect }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { value: 'admin', label: 'Админ' },
        { value: 'user', label: 'Пользователь' },
        { value: 'manager', label: 'Мэнеджер' },
        { value: 'read_only', label: 'Только для чтения' },
    ]

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        onSelect(selectedOption);
    };

    return (
        <div className="table__modal-row">
            <label className="table__modal-cell-title">
                Роль
            </label>
            <Select
                classNamePrefix='select'
                value={selectedOption}
                onChange={handleSelectChange}
                options={options}
                placeholder="Выбрать роль"
            />
        </div>
    );
}

export default SelectRole;