import React from 'react';
import TableStructure from "@/components/table/components/TableStructure";
import FundsPage from "@/components/table/funds/FundsPage";

function Users() {
    return (
        <TableStructure
            classNames={"App app__table app__table-wrap"}
            styles={{overflow: "hidden"}}
        >
            <FundsPage/>
        </TableStructure>
    );
}

export default Users;