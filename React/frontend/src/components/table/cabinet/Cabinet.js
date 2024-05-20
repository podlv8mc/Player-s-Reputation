import React from 'react';
import MainCabinet from "@/components/table/cabinet/MainCabinet";
import TableStructure from "@/components/table/components/TableStructure";

function Users() {
    return (
        <TableStructure
            classNames={"App app__table app__table-wrap"}
            styles={{overflow: "hidden"}}
        >
            <MainCabinet />
        </TableStructure>
    );
}

export default Users;