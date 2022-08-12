import React, { Component } from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const chapterSlice = createSlice({
  name: "sora",
  initialState: {
    allChapters: [],
    cahpterInfo: {},
    chapterId: 1,
    chapterAudio: "",
    SearchedChapter: [],
  },
  reducers: {
    getAllChapters(state, action) {
      state.allChapters = action.payload;
    },
    getChapterInfo(state, action) {
      state.cahpterInfo = action.payload;
    },
    getChapterId(state, action) {
      state.chapterId = action.payload;
    },
    getChapterAudio(state, action) {
      state.chapterAudio = action.payload;
    },
    getSearchedChapter(state, action) {
      state.SearchedChapter = action.payload;
    },
  },
});
const verseSlice = createSlice({
  name: "verse",
  initialState: {
    allVerses: [],
  },
  reducers: {
    getAllVerses(state, action) {
      state.allVerses = action.payload;
    },
  },
});
const reciterSlice = createSlice({
  name: "reciter",
  initialState: {
    reciters: [],
    reciterId: 1,
  },
  reducers: {
    getAllReciters(state, action) {
      state.reciters = action.payload;
    },
    getReciterId(state, action) {
      state.reciterId = action.payload;
    },
  },
});
const translationSlice = createSlice({
  name: "translation",
  initialState: {
    translations: [],
    translationId: 131,
  },
  reducers: {
    getAllTranslations(state, action) {
      state.translations = action.payload;
    },
    getTranslationId(state, action) {
      state.translationId = action.payload;
    },
  },
});
const settingsSlice = createSlice({
  name: "setting",
  initialState: {
    show: false,
  },
  reducers: {
    showSetting(state, action) {
      state.show = !state.show;
    },
  },
});

const store = configureStore({
  reducer: {
    sora: chapterSlice.reducer,
    verse: verseSlice.reducer,
    reciter: reciterSlice.reducer,
    setting: settingsSlice.reducer,
    translation: translationSlice.reducer,
  },
});
export const chapterActions = chapterSlice.actions;
export const verseActions = verseSlice.actions;
export const reciterActions = reciterSlice.actions;
export const settingActions = settingsSlice.actions;
export const translationActions = translationSlice.actions;
export default store;
