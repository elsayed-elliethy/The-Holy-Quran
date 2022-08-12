import React from "react";
import Chapters from "../../components/Chapters/Chapters";
import Header from "../../components/header/Header";
import Search from "../../components/search/Search";
const Home = () => {
  return (
    <div>
      <Header />
      <Search />
      <Chapters />
    </div>
  );
};

export default Home;
