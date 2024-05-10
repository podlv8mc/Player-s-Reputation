import React from 'react';
import TableStructure from "@/components/table/components/TableStructure";
import MainUsers from "@/components/table/users/MainUsers";
import UsersPage from "@/components/table/users/UsersPage";

function Users() {
    return (
        <TableStructure>
            <MainUsers />
        </TableStructure>
    );
}

export default Users;