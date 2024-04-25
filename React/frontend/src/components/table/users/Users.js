import React from 'react';
import ResizableHeader from "@/components/ResizableHeader";
import MainUsers from "@/components/table/users/MainUsers";

function Users() {
    return (
        <div className="App app__table">
            <ResizableHeader />
            <MainUsers />
        </div>
    );
}

export default Users;