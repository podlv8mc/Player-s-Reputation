import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from "@/components/HomePage";
import Table from "@/components/table/Table";
import Users from "@/components/table/Users/Users";

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/table" element={<Table />} />
            <Route path="/Users" element={<Users />} />
        </Routes>
    );
}

export default App;