import React from "react";
import ResizableHeader from "@/components/ResizableHeader";

const TableStructure = ({children}) => {
    return (
        <div className="App app__table">
            <ResizableHeader/>
            <main id="main" className="main">
                {children}
            </main>
        </div>
    );
}

export default TableStructure;