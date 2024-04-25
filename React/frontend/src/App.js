import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from "@/components/HomePage";
import Table from "@/components/table/Table";
import Users from "@/components/table/Users/Users";
import Funds from "@/components/table/Funds/Funds";
import Cabinet from "@/components/table/Cabinet/Cabinet";

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/table" element={<Table />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/Funds" element={<Funds />} />
            {/*<Route path="/Cabinet" element={<Cabinet />} />*/}
        </Routes>
    );
}

export default App;