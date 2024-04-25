import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from "@/components/HomePage";
import Table from "@/components/table/Table";
import Users from "@/components/table/users/Users";
import Funds from "@/components/table/funds/Funds";
import Cabinet from "@/components/table/cabinet/Cabinet";

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/table" element={<Table />} />
            <Route path="/users" element={<Users />} />
            <Route path="/funds" element={<Funds />} />
            {/*<Route path="/cabinet" element={<cabinet />} />*/}
        </Routes>
    );
}

export default App;