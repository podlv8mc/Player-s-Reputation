import React, {useEffect, useState} from "react";
import Select from "react-select";
import axios from "axios";

function SelectSigns({ onSelect }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [fundSelect, setfundSelect] = useState();

    useEffect(() => {
        axios.get('http://213-134-31-78.netherlands.vps.ac/api/v1/funds', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((data) => {
            console.log(data.data.items);
            setfundSelect(data.data.items.map(function(obj) {
                return {'value': obj.id, 'label': obj.name};
            }));
            console.log(fundSelect);
        }).catch(() => {

        })
    }, []);

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
                options={fundSelect}
            />
        </div>
    );
}

export default SelectSigns;