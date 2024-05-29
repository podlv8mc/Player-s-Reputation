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
                const response = await axios.get(`${domain}funds`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                    }
                });
                const options = response.data.items.map(obj => ({ value: obj.id, label: obj.name }));
                setFundSelect(options);
            } catch (error) {
                console.error("Error fetching funds:", error);
            }
        };

        const fetchUserFunds = async () => {
            try {
                const response = await axios.get(`${domain}users/${userId}/funds`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                    }
                });
                const userFunds = response.data.map(fund => ({ value: fund.id, label: fund.name }));
                setSelectedOption(userFunds);
                onSelect(userFunds);
            } catch (error) {
                console.error("Error fetching user funds:", error);
            }
        };

        // Вызов fetchFunds для всех случаев
        fetchFunds();

        // Если selectName равен "users" и передан userId, выполняем запрос для получения фондов пользователя
        if (selectName === "users" && userId) {
            fetchUserFunds();
        }
    }, [onSelect, selectName, userId]);

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