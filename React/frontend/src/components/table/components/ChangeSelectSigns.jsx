import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import domain from "@/domain";
import ModalLine from "@/components/table/components/ModalLine";

function ChangeSelectSigns({ onSelect, isMulti = false, currentUser }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [fundSelect, setFundSelect] = useState([]);

    useEffect(() => {
        axios.get(`${domain}funds`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then((data) => {
                const options = data.data.items.map(obj => ({ value: obj.id, label: obj.name }));
                setFundSelect(options);

                const userFunds = currentUser.funds.map(fund => options.find(option => option.value === fund.id));
                setSelectedOption(userFunds);
                onSelect(userFunds.map(option => option.value));
                console.log("Фонды пользователя установлены:", userFunds);
            })
            .catch((error) => {
                console.error("Ошибка при получении фондов:", error);
            });
    }, [onSelect, currentUser]);

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        //onSelect(selectedOption.map(option => option.value));
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
