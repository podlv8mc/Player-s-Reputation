import React from 'react';
import '@styles/index.scss';
import Main from "@/components/main/Main";
import Header from "@/components/header/Header";

function App() {
    return (
        <div className="App">
            <Header/>
            <Main/>
        </div>
    );
}

export default App;