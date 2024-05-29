import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import domain from "@/domain";
import ModalLine from "@/components/table/components/ModalLine";

function ChangeSelectSigns({ onSelect, isMulti = false }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [fundSelect, setFundSelect] = useState([]);

    useEffect(() => {
        axios.get(`${domain}funds`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then((data) => {
                setFundSelect(data.data.items.map(obj => ({ value: obj.id, label: obj.name })));
            })
            .catch((error) => {
                console.error("Error fetching funds:", error);
            });
    }, []);

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