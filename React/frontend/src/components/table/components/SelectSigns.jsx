import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import domain from "@/domain";

function SelectSigns({ onSelect, isMulti = false, selectName = "" }) {
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

                // Установить defaultValue только если selectName равен "users"
                if (selectName === "users" && options.length > 1) {
                    setSelectedOption([options[2]]);
                    onSelect([options[2]]);
                }
            })
            .catch((error) => {
                console.error("Error fetching funds:", error);
            });
    }, [onSelect, selectName]);

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