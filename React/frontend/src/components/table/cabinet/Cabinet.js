import React from 'react';
import ResizableHeader from "@/components/ResizableHeader";
import MainCabinet from "@/components/table/cabinet/MainCabinet";

function Users() {
    return (
        <div className="App">
            <ResizableHeader />
            <main className="main">
                <MainCabinet />
            </main>
        </div>
    );
}

export default Users;