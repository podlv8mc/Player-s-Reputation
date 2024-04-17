import React from 'react';
import ResizableHeader from "@/components/ResizableHeader";
import MainCabinet from "@/components/table/Cabinet/MainCabinet";

function Users() {
    return (
        <div className="App app__table">
            <ResizableHeader />
            <MainCabinet />
        </div>
    );
}

export default Users;