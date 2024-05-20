import React from 'react';
import TableStructure from "@/components/table/components/TableStructure";
import RecordsPage from "@/components/table/records/RecordsPage";

function Table() {
    return (
        <TableStructure classNames={"App app__table"}>
            <RecordsPage />
        </TableStructure>
    );
}

export default Table;