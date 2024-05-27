import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import domain from "@/domain";

function SelectSigns({ onSelect, isMulti = false }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [fundSelect, setFundSelect] = useState([]);

    useEffect(() => {
        axios.get(`${domain}funds`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then((data) => {
                setFundSelect(data.data.items.map(function(obj) {
                    return { value: obj.id, label: obj.name };
                }));
            }).catch((error) => {
            console.error("Error fetching funds:", error);
        });
    }, []);

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        onSelect(selectedOption);
        console.log(selectedOption);
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
                isMulti={isMulti}
                defaultValue={[fundSelect[1]]}
            />
        </div>
    );
}

export default SelectSigns;
