import React from "react";
import Home from "./home/Home";
import { Routes, Route } from "react-router-dom";
import ChapterSingle from "./chapterSingle/ChapterSingle";
import Nav from "../components/navs/Nav";
import Setting from "../components/setting/Setting";
const Pages = () => {
  return (
    <div>
      <Nav />
      <Setting />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chapter/:chapterID" element={<ChapterSingle />} />
      </Routes>
      {/* <Home /> */}
    </div>
  );
};

export default Pages;
