import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import Home from "./pages/Home";
import Note from "./pages/Note";
import Bin from "./pages/Bin";
import ErrorPage from "./pages/ErrorPage";


function App() {

  return (
    <div className="body__wrapper">
      <Header />
      <main className="main main--content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bin" element={<Bin />} />
          <Route path="/notes/:id" element={<Note />} />
          <Route path="*" element={<ErrorPage errCode={'404'} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
