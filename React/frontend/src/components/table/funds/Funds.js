import React from 'react';
import MainFunds from "@/components/table/funds/MainFunds";
import TableStructure from "@/components/table/components/TableStructure";
import FundsPage from "@/components/table/funds/FundsPage";

function Users() {
    return (
        <TableStructure>
            <FundsPage />
        </TableStructure>
    );
}

export default Users;