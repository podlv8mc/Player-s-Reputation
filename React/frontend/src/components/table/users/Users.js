import React from 'react';
import TableStructure from "@/components/table/components/TableStructure";
import UsersPage from "@/components/table/users/UsersPage";

function Users() {
    return (
        <TableStructure
            classNames={"App app__table app__table-wrap"}
            styles={{overflow: "hidden"}}
        >
            <UsersPage/>
        </TableStructure>
    );
}

export default Users;