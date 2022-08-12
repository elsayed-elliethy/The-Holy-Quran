import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "./Search.css";
const Search = () => {
  const allChapters = useSelector((state) => {
    return state.sora.allChapters;
  });

  const [enteredValue, setEnteredValue] = useState("");
  const changeSearchHandler = (searchValue) => {
    if (searchValue.trim() === "") {
      return;
    } else {
      setEnteredValue(searchValue);
    }
  };
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (enteredValue === "") {
      return;
    } else {
      const updatedChapters = allChapters.filter((ele) => {
        return ele.nameArabic === enteredValue;
      });
      navigate(`/chapter/${updatedChapters[0].id}`);
    }
  };
  return (
    <form className="text-center searchForm" onSubmit={submitHandler}>
      <NavLink to={enteredValue === "" ? "/" : `/chapter/${enteredValue}`}>
        <FaSearch />
      </NavLink>

      <input
        type="search"
        placeholder="What do you want to read?"
        onChange={(e) => changeSearchHandler(e.target.value)}
        // value={enteredValue}
      />
    </form>
  );
};

export default Search;
