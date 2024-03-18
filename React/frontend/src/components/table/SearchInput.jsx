import React from 'react';

function SearchInput({ value, onChange }) {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Search..."
        />
    );
}

export default SearchInput;
