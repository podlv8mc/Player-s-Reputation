import React from 'react';
import Table from "@/components/table/components/Table";

function UsersPage() {
    const apiLink = "users";

    return (
        <>
            <Table
                apiLink={apiLink}
            />
        </>
    );
}

export default UsersPage;