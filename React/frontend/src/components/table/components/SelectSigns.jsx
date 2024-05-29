import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import domain from "@/domain";

function SelectSigns({ onSelect, isMulti = false, selectName = "", userId }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [fundSelect, setFundSelect] = useState([]);

    useEffect(() => {
        const fetchFunds = async () => {
            try {
                console.log("Запрос всех фондов...");
                const response = await axios.get(`${domain}funds`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                    }
                });
                const options = response.data.items.map(obj => ({ value: obj.id, label: obj.name }));
                setFundSelect(options);
                console.log("Фонды успешно получены:", options);

                // Проверка условий
                console.log("selectName:", selectName);
                console.log("userId:", userId);

                if (selectName === "users" && userId && userId.funds) {
                    console.log("Фонды пользователя:", userId.funds);
                    const userFunds = userId.funds.map(fund => options.find(option => option.value === fund.id));
                    setSelectedOption(userFunds);
                    onSelect(userFunds);
                    console.log("Фонды пользователя установлены:", userFunds);
                } else {
                    console.log("Необходимо установить фонды по умолчанию, но условие не выполнено.");
                }
            } catch (error) {
                console.error("Ошибка при получении фондов:", error);
            }
        };

        fetchFunds();
    }, [onSelect, selectName, userId]);

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        onSelect(selectedOption);
        console.log("Выбранные фонды изменены:", selectedOption);
    };

    return (
        <div className="table__modal-row">
            <label className="table__modal-cell-title">
                Фонд
            </label>
            <Select
                classNamePrefix="select"
                value={selectedOption}
                onChange={handleSelectChange}
                options={fundSelect}
                placeholder="Выбрать фонд"
                closeMenuOnSelect={false}
                isMulti={isMulti}
            />
        </div>
    );
}

export default SelectSigns;