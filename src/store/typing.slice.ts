import { ITyping } from '@/types/typing.types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ITyping = {
  text: "",
  userInput: "",
  statistic: [],
  time: 30,
  wpm: 0,
  timeRemaining: 30,
  timerRunning: false,
  startTime: null,
  errors: 0,
  totalWords: 0,
  totalErrors: 0
};

const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    updateUserInput(state, action) {
      state.userInput = action.payload;
    },
    setText(state, action) {
      state.text = action.payload;
    },
    calculateErrors(state) {
      const expectedWord = state.text.split(' ')[0];
      const userInput = state.userInput.split('');

      let errors = 0;
      for (let i = 0; i < userInput.length; i++) {
        if (expectedWord[i] !== userInput[i]) {
          errors += 1;
        }
      }

      if (userInput.length > expectedWord.length) {
        errors += userInput.length - expectedWord.length;
      }

      state.errors = errors;
    },
    processWord(state) {

      if (state.userInput.trim().length > 0) { // Проверка на пустой ввод
        const expectedWord = state.text.split(' ')[0];
        const userInput = state.userInput;

        if (expectedWord == userInput) {
          state.totalWords += 1; // Увеличиваем счетчик введенных слов
          state.text = state.text.replace(/^\s*\S+\s*/, ''); // Убираем введенное слово из текста
          state.userInput = ""; // Очищаем userInput
        }
      }
    },
    calculateWPM(state) {
      const currentTime = new Date().getTime();
      const timeElapsed = (currentTime - state.startTime!) / 60000;  // Время в минутах

      console.log(state.totalWords / timeElapsed)

      if (timeElapsed > 0) {
        state.wpm = Math.floor(state.totalWords / timeElapsed); // Используем totalWords для расчета WPM
      }
    },
    setStartTime(state) {
      if (!state.timerRunning) {
        state.startTime = new Date().getTime();
      }
      state.timerRunning = true;
    },
    recordStatistics(state) {
      state.statistic.push({
        name: state.timeRemaining + 1,
        wpm: state.wpm,
        error: state.errors == 0 ? null : state.errors,
      });
    },
    reset(state) {
      state.userInput = "";
      state.errors = 0;
      state.wpm = 0;
      state.timerRunning = false;
      state.timeRemaining = state.time;
      state.startTime = null;
      state.statistic = [];
      state.totalWords = 0; // Сбрасываем счетчик введенных слов
      state.totalErrors = 0
    },
    decrementTime(state) {
      if (state.timeRemaining > 0) {
        state.timeRemaining -= 1;

        typingSlice.caseReducers.calculateWPM(state);
        typingSlice.caseReducers.calculateErrors(state);
        state.totalErrors += state.errors;

        typingSlice.caseReducers.recordStatistics(state);
      } else {
        state.timerRunning = false;
      }
    },
    changeTimer(state, actions) {
      state.timeRemaining = actions.payload;
      state.time = actions.payload;
    },
  },
});

export const {
  updateUserInput,
  setText,
  calculateErrors,
  calculateWPM,
  setStartTime,
  recordStatistics,
  reset,
  decrementTime,
  processWord,
  changeTimer,
} = typingSlice.actions;

export default typingSlice.reducer;