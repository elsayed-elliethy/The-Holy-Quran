import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { NavLink, useParams } from "react-router-dom";
import Search from "./Search";
import "./searchResult.css";
import Categories from "../category/Categories";
import altImg from "../../assets/alt.jpg";
import { useSelector } from "react-redux";
const SearchResult = () => {
  // /////////////
  const SearchedChapter = useSelector((state) => {
    return state.sora.SearchedChapter;
  });
  // const { searchValue } = useParams();
  ///////////
  return (
    <div>
      <div className="row">
        {SearchedChapter.map((ele) => {
          return (
            <div key={ele.id} id={ele.id} className="col-md-6 col-lg-4 mb-4">
              <NavLink to={`chapter/${ele.id}`} className="chapter">
                <span>{ele.id}</span>
                <div className="info">
                  <div>
                    <p>{ele.nameComplex}</p>
                    <p>{ele.translated_name}</p>
                  </div>
                  <div>
                    <p>{ele.nameArabic}</p>
                    <p>{ele.ayahs} Ayahs</p>
                  </div>
                </div>
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResult;
