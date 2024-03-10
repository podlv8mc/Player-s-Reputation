import React from 'react';
import '@styles/index.scss';
import Header from "@/components/header/Header";
import Main from "@/components/main/Main";
import {Route, Routes} from "react-router-dom";

function App() {

    return (
      <Routes>
          <Route exact path="/" element={<Main/>} />
          <Route path="/header" element={<Header/>} />
      </Routes>
    );
}

export default App;