import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Verse from "../verse/Verse";
const Verses = () => {
  const allVerses = useSelector((state) => {
    return state.verse.allVerses;
  });
  return (
    <div>
      {allVerses.map((ele) => {
        return <Verse verseKey={ele.verse_key} key={ele.id} />;
      })}
    </div>
  );
};

export default Verses;
