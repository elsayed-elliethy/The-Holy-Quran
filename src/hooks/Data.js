import React, { useEffect, useState } from "react";
import useHttp from "./use-http";
import { useDispatch, useSelector } from "react-redux";
import { chapterActions, reciterActions, translationActions } from "../store";
import { verseActions } from "../store";
import { useParams } from "react-router-dom";
const Data = (props) => {
  const chapterInfo = useSelector((state) => {
    return state.sora.cahpterInfo;
  });
  const chapterID = useSelector((state) => {
    return state.sora.chapterId;
  });
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

  const dispatch = useDispatch();
  const allChaptersApi = `https://api.quran.com/api/v4/chapters?language=en`;
  const chapterApi = `https://api.quran.com/api/v4/chapters/${chapterID}?language=en`;
  // const recitation_id = 2;
  const chapterAudioApi = `https://api.qurancdn.com/api/qdc/audio/reciters/${reciterId}/audio_files?chapter=${chapterID}&segments=true`;

  const allVersesApi = `https://api.quran.com/api/v4/verses/by_chapter/${chapterID}?language=en&words=true&translations=$\{translationSrc_id}&fields=text_imlaei&word_fields=v1_page,code_v1&page=$/{page_number}&per_page=${chapterInfo.ayahs}`;
  const recitersApi = `https://api.quran.com/api/v4/resources/recitations?language=en`;
  const translationApi = `https://api.quran.com/api/v4/resources/translations`;

  const { isLoading, error, requestFn, closeError } = useHttp();

  // useEffect(() => {
  //   dispatch(chapterActions.getAllChapters(surahsOverviewData));
  // }, [dispatch, surahsOverviewData]);
  // /////get all chapters////////
  useEffect(() => {
    const transformProducts = (data) => {
      const loadedProducts = [];
      data.chapters.map((ele, index) => {
        return loadedProducts.push({
          id: ele.id,
          nameSimple: ele.name_simple,
          nameArabic: ele.name_arabic,
          nameComplex: ele.name_complex,
          pages: ele.pages,
          translated_name: ele.translated_name.name,
          ayahs: ele.verses_count,
        });
      });
      dispatch(chapterActions.getAllChapters(loadedProducts));
    };
    requestFn(
      {
        url: allChaptersApi,
      },
      transformProducts
    );
  }, [requestFn, allChaptersApi, dispatch]);
  /////////

  // //////get chapter info///////
  useEffect(() => {
    const transformProducts = (data) => {
      const loadedChapter = {
        id: data.chapter.id,
        nameSimple: data.chapter.name_simple,
        nameArabic: data.chapter.name_arabic,
        nameComplex: data.chapter.name_complex,
        pagesNum: data.chapter.pages[1] - data.chapter.pages[0],
        startPage: data.chapter.pages[0],
        endPage: data.chapter.pages[1],
        translated_name: data.chapter.translated_name.name,
        ayahs: data.chapter.verses_count,
        revelation_place: data.chapter.revelation_place,
      };
      dispatch(chapterActions.getChapterInfo(loadedChapter));
    };
    requestFn(
      {
        url: chapterApi,
      },
      transformProducts
    );
  }, [requestFn, chapterApi, dispatch]);
  ///////////
  // //////get chapter audio///////
  useEffect(() => {
    const transformProducts = (data) => {
      const loadedChapterAudio = {
        id: data.audio_files[0].id,
        format: data.audio_files[0].format,
        url: data.audio_files[0].audio_url,
      };
      dispatch(chapterActions.getChapterAudio(loadedChapterAudio));
    };
    requestFn(
      {
        url: chapterAudioApi,
      },
      transformProducts
    );
  }, [requestFn, chapterAudioApi, dispatch]);
  ///////////
  // //////get all Verses///////
  useEffect(() => {
    const transformProducts = (data) => {
      let loadedChapterAyahs = [];
      data.verses.map((ele) => {
        return loadedChapterAyahs.push({
          id: ele.id,
          juz_number: ele.juz_number,
          hizb_number: ele.hizb_number,
          verse_key: ele.verse_key,
          verse_number: ele.verse_number,
          textArabic: ele.text_imlaei,
          page_number: ele.page_number,
          audio: ele.audio,
          words: ele.words.map((el) => {
            return el.translation.text;
          }),
        });
      });
      dispatch(verseActions.getAllVerses(loadedChapterAyahs));
    };
    requestFn(
      {
        url: allVersesApi,
      },
      transformProducts
    );
  }, [requestFn, allVersesApi, dispatch]);
  // //////get all reciters///////
  useEffect(() => {
    const transformProducts = (data) => {
      let loadedChapterReciters = [];
      data.recitations.map((ele) => {
        return loadedChapterReciters.push({
          id: ele.id,
          reciter_name: ele.reciter_name,
          style: ele.style,
        });
      });
      dispatch(reciterActions.getAllReciters(loadedChapterReciters));
    };
    requestFn(
      {
        url: recitersApi,
      },
      transformProducts
    );
  }, [requestFn, recitersApi, dispatch]);
  // //////get all Translations///////
  useEffect(() => {
    const transformProducts = (data) => {
      let loadedChapterTranslations = [];
      data.translations.map((ele) => {
        return loadedChapterTranslations.push({
          id: ele.id,
          author_name: ele.author_name,
          language_name: ele.language_name,
          name: ele.name,
          slug: ele.slug,
        });
      });
      dispatch(
        translationActions.getAllTranslations(loadedChapterTranslations)
      );
    };
    requestFn(
      {
        url: translationApi,
      },
      transformProducts
    );
  }, [requestFn, translationApi, dispatch]);

  return <div></div>;
};

export default Data;
