import React from 'react';
import MainTable from "@/components/table/records/MainTable";
import TableStructure from "@/components/table/components/TableStructure";
import RecordsPage from "@/components/table/records/RecordsPage";

function Table() {
    return (
        <TableStructure>
            <RecordsPage />
        </TableStructure>
    );
}

export default Table;