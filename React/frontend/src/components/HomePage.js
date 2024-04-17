import React from 'react';
import '@styles/index.scss';
import ResizableHeader from "@/components/ResizableHeader";
import Main from "@/components/main/Main";

function HomePage() {
    return (
        <div className="App">
            <ResizableHeader />
            <Main />
        </div>
    );
}

export default HomePage;