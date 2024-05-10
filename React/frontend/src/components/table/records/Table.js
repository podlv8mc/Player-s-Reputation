import React from 'react';
import MainTable from "@/components/table/records/MainTable";
import TableStructure from "@/components/table/components/TableStructure";

function Table() {
    return (
        <TableStructure>
            <MainTable />
        </TableStructure>
    );
}

export default Table;