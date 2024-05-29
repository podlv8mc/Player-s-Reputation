import React, {useState} from "react";
import Select from "react-select";
import ModalLine from "@/components/table/components/ModalLine";

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
        <ModalLine tittle="Роль">
            <Select
                classNamePrefix='select'
                value={selectedOption}
                onChange={handleSelectChange}
                options={options}
                placeholder="Выбрать роль"
            />
        </ModalLine>
    );
}

export default SelectRole;