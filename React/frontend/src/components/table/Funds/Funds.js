import React from 'react';
import ResizableHeader from "@/components/ResizableHeader";
import MainFunds from "@/components/table/Funds/MainFunds";

function Users() {
    return (
        <div className="App app__table">
            <ResizableHeader />
            <MainFunds />
        </div>
    );
}

export default Users;