import React from "react";
import ResizableHeader from "@/components/ResizableHeader";

const TableStructure = ({classNames, children, style, styles}) => {
    return (
        <div className={classNames} style={style}>
            <ResizableHeader/>
            <main id="main" className="main" style={styles}>
                {children}
            </main>
        </div>
    );
}

export default TableStructure;