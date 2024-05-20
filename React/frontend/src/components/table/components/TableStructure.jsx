import React from "react";
import ResizableHeader from "@/components/ResizableHeader";

const TableStructure = ({classNames, children, styles}) => {
    return (
        <div className={classNames}>
            <ResizableHeader/>
            <main id="main" className="main" style={styles}>
                {children}
            </main>
        </div>
    );
}

export default TableStructure;