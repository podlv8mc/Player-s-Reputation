import React from 'react';
import TableStructure from "@/components/table/components/TableStructure";
import RecordsPage from "@/components/table/records/RecordsPage";
import TestModal from "@/components/table/records/TestModal";

function Table() {
    return (
        <TableStructure classNames={"App app__table"}>
            <TestModal />
        </TableStructure>
    );
}

export default Table;