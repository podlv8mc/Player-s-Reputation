import React, {useEffect, useState} from "react";
import Select from "react-select";
import axios from "axios";
import domain from "@/domain";
import ModalLine from "@/components/table/components/ModalLine";

function ChangeSelectSigns({onSelect, isMulti = false, selectName = "", userId}) {
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
                const options = response.data.items.map(obj => ({value: obj.id, label: obj.name}));
                setFundSelect(options);

                if (selectName === "users" && userId && userId.funds) {
                    const userFunds = userId.funds.map(fund => options.find(option => option.value === fund.id));
                    setSelectedOption(userFunds);
                    onSelect(userFunds);
                    console.log("Фонды пользователя установлены:", userFunds);
                }
            } catch (error) {
                console.error("Ошибка при получении фондов:", error);
            }
        };

        fetchFunds();
    }, [onSelect, selectName, userId]);

    const handleSelectChange = (selectedOption) => {
        const selectedIds = selectedOption.map(option => option.value);
        setSelectedOption(selectedOption);
        onSelect(selectedIds);
        console.log("Выбранные фонды изменены:", selectedIds);
    };


    return (
        <ModalLine tittle="Фонд">
            <Select
                classNamePrefix="select"
                value={selectedOption}
                onChange={handleSelectChange}
                options={fundSelect}
                placeholder="Выбрать фонд"
                closeMenuOnSelect={false}
                isMulti={isMulti}
            />
        </ModalLine>
    );
}

export default ChangeSelectSigns;