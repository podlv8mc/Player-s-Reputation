import React from 'react';
import ResizableHeader from "@/components/ResizableHeader";
import MainTable from "@/components/table/MainTable";

function Table() {
    return (
        <div className="App app__table">
            <ResizableHeader />
            <MainTable />
        </div>
    );
}

export default Table;