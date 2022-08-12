import React, { useEffect, useState } from "react";
import veseImg from "../../assets/ayah1.png";
import "./Verse.css";
import useHttp from "../../hooks/use-http";
import { useSelector } from "react-redux";
const Verse = (props) => {
  const { verseKey } = props;

  const recitation_id = useSelector((state) => {
    return state.reciter.reciterId;
  });
  const [reciterId, setReciterId] = useState(2);
  useEffect(() => {
    if (localStorage.getItem("reciter")) {
      const storedReciter = JSON.parse(localStorage.getItem("reciter"));
      setReciterId(+storedReciter.id);
    } else {
      setReciterId(recitation_id);
    }
  }, [recitation_id]);
  const translationSrc_id = useSelector((state) => {
    return state.translation.translationId;
  });
  const [translationId, setTranslationId] = useState(131);
  useEffect(() => {
    if (localStorage.getItem("translation")) {
      const storedTranslation = JSON.parse(localStorage.getItem("translation"));
      setTranslationId(+storedTranslation.id);
    } else {
      setTranslationId(translationSrc_id);
    }
  }, [translationSrc_id]);
  const [tafsir, setTafsir] = useState("");
  const tafsir_id = 160;
  const verseApi = `https://api.quran.com/api/v4/verses/by_key/${verseKey}?language=en&words=true&translations=${translationId}&word_fields=v1_page%2Ccode_v1&fields=text_imlaei&audio=1`;
  const verseAudioApi = `https://api.quran.com/api/v4/recitations/${reciterId}/by_ayah/${verseKey}`;
  const verseTranslationApi = `https://api.quran.com/api/v4/quran/translations/${translationId}?verse_key=${verseKey}`;
  const verseTafsirApi = `https://api.quran.com/api/v4/quran/tafsirs/${tafsir_id}?verse_key=${verseKey}`;

  const { isLoading, error, requestFn, closeError } = useHttp();
  const [verseInfo, setVerseInfo] = useState({});
  const [verseAudio, setVerseAudio] = useState("");
  const [verseTranslation, setVerseTranslation] = useState("");
  //////get verse info//////
  useEffect(() => {
    const transformProducts = (data) => {
      const loadedVerse = {
        id: data.verse.id,
        juz_number: data.verse.juz_number,
        text_imlaei: data.verse.text_imlaei,
        verse_key: data.verse.verse_key,
        verse_number: data.verse.verse_number,
        page_number: data.verse.page_number,
      };
      setVerseInfo(loadedVerse);
    };
    requestFn(
      {
        url: verseApi,
      },
      transformProducts
    );
  }, [requestFn, verseApi]);
  // //////get verse audio///////
  useEffect(() => {
    const transformProducts = (data) => {
      const loadedVerseAudio = {
        url: data.audio_files[0].url,
      };
      setVerseAudio(loadedVerseAudio);
    };
    requestFn(
      {
        url: verseAudioApi,
      },
      transformProducts
    );
  }, [requestFn, verseAudioApi]);
  //////////
  // //////get verse translation///////
  useEffect(() => {
    const transformProducts = (data) => {
      const loadedVerseTransition = {
        translation: data.translations[0].text,
      };
      setVerseTranslation(loadedVerseTransition);
    };

    requestFn(
      {
        url: verseTranslationApi,
      },
      transformProducts
    );
  }, [requestFn, verseTranslationApi]);

  return (
    <div className="verse">
      <div className="w-100 d-flex justify-content-between align-items-center firstDiv">
        <p className="verseKey">{verseKey}</p>
        {/* {verseAudio.url && ( */}
        <audio
          src={`https://download.quranicaudio.com/verses/${verseAudio.url}`}
          type={`audio/mp3`}
          controls
          controlsList="nodownload"
        />
        {/* )} */}
      </div>

      <div className="w-100 d-flex align-items-center flex-row-reverse mt-3">
        {/* <p className="verseText">{verseInfo.text_imlaei}</p>
        <div className="position-relative num-img">
          <span className="verse-num">{verseInfo.verse_number}</span>
          <img className="verse-img" src={veseImg} alt="..." />
        </div> */}
        <span className="verseline text-center">
          {verseInfo.text_imlaei}
          <div className="versenum">
            <span className="number">{verseInfo.verse_number}</span>
            <img className="verseimg" src={veseImg} alt="..."></img>
          </div>
        </span>
      </div>

      <p
        dangerouslySetInnerHTML={{ __html: `${verseTranslation.translation}` }}
      ></p>
      {/* <p
        className="tafseerP"
        dangerouslySetInnerHTML={{ __html: `${tafsir.tafsir}` }}
      ></p> */}
      {/* <p>{tafsir.tafsir}</p> */}
    </div>
  );
};

export default Verse;
