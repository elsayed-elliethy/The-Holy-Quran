import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reciterActions, translationActions } from "../../store";
import "./Setting.css";

const Setting = (props) => {
  const dispatch = useDispatch();
  const allReciters = useSelector((state) => {
    return state.reciter.reciters;
  });
  const updatedReciters = allReciters.filter((ele) => {
    return ele.id !== 8 && ele.id !== 11 && ele.id !== 12 && ele.id !== 6;
  });
  // console.log(updatedReciters);
  const allTranslations = useSelector((state) => {
    return state.translation.translations;
  });
  ////////show and hide settings///////
  const showSetting = useSelector((state) => {
    return state.setting.show;
  });
  let settingClasses;
  if (showSetting) {
    settingClasses = "settings show-settings";
  } else {
    settingClasses = "settings hide-settings";
  }
  /////////////

  const [selectedReciter, setSelectedReciter] = useState(
    "AbdulBaset AbdulSamad"
  );
  const [selectedTranslation, setSelectedTranslation] = useState(
    "Dr. Mustafa Khattab-english"
  );
  const [defaultCheckedReciter, setDefaultCheckedReciter] = useState(2);
  const [defaultCheckedTranslation, setDefaultCheckedTranslation] =
    useState(131);

  useEffect(() => {
    if (localStorage.getItem("reciter")) {
      const storedReciter = JSON.parse(localStorage.getItem("reciter"));
      setSelectedReciter(storedReciter.value);
      setDefaultCheckedReciter(+storedReciter.id);
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("translation")) {
      const storedTranslation = JSON.parse(localStorage.getItem("translation"));
      setSelectedTranslation(storedTranslation.value);
      setDefaultCheckedTranslation(+storedTranslation.id);
    }
  }, []);

  const selectReciterHandler = (id, value) => {
    dispatch(reciterActions.getReciterId(id));
    setSelectedReciter(value);
    localStorage.setItem("reciter", JSON.stringify({ id: id, value: value }));
    console.log("resiter", id);
  };
  const selectTranslationHandler = (id, value) => {
    dispatch(translationActions.getTranslationId(id));
    setSelectedTranslation(value);
    localStorage.setItem(
      "translation",
      JSON.stringify({ id: id, value: value })
    );
  };
  const [showReciters, setShowReciters] = useState(false);
  const [showTranslations, setShowTranslations] = useState(false);

  const resetSettingHandler = () => {
    localStorage.removeItem("reciter");
    localStorage.removeItem("translation");
    window.location.reload();
  };
  ////////////////

  return (
    <div className={settingClasses}>
      <div className="settings-container">
        <div className="option-box">
          <h3>Reciters</h3>
          <div
            className="selected-reciter"
            onClick={() => setShowReciters((prev) => !prev)}
          >
            {selectedReciter}
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.158 3.135a.5.5 0 0 1 .707.023l3.75 4a.5.5 0 0 1 0 .684l-3.75 4a.5.5 0 1 1-.73-.684L9.566 7.5l-3.43-3.658a.5.5 0 0 1 .023-.707Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          {showReciters && (
            <ul className="list-unstyled">
              {updatedReciters.map((ele) => {
                return (
                  (ele.id !== 8 || ele.id !== 11) && (
                    <li key={ele.id}>
                      <input
                        id={ele.id}
                        className=""
                        type="radio"
                        name="Reciter"
                        value={ele.reciter_name}
                        onClick={(e) =>
                          selectReciterHandler(e.target.id, e.target.value)
                        }
                        defaultChecked={ele.id === defaultCheckedReciter}
                      />
                      <label htmlFor={ele.id} className="">
                        {ele.reciter_name}
                      </label>
                    </li>
                  )
                );
              })}
            </ul>
          )}
        </div>
        <hr />
        <div className="option-box">
          <h3>Translations</h3>
          <div
            className="selected-reciter"
            onClick={() => setShowTranslations((prev) => !prev)}
          >
            {selectedTranslation}
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.158 3.135a.5.5 0 0 1 .707.023l3.75 4a.5.5 0 0 1 0 .684l-3.75 4a.5.5 0 1 1-.73-.684L9.566 7.5l-3.43-3.658a.5.5 0 0 1 .023-.707Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          {showTranslations && (
            <ul className="list-unstyled">
              {allTranslations.map((ele) => {
                return (
                  <li key={ele.id}>
                    <input
                      id={ele.id}
                      className=""
                      type="radio"
                      name="translation"
                      value={`${ele.author_name}-${ele.language_name}`}
                      onClick={(e) =>
                        selectTranslationHandler(e.target.id, e.target.value)
                      }
                      defaultChecked={ele.id === defaultCheckedTranslation}
                    />
                    <label htmlFor={ele.id} className="">
                      {ele.author_name.substring(0, 20)}-
                      <span className="langName">{ele.language_name}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <hr />

        <div className="reset" onClick={resetSettingHandler}>
          Reset
        </div>
      </div>
    </div>
  );
};

export default Setting;
