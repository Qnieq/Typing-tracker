import { ITyping } from '@/types/typing.types';
import { createSlice } from '@reduxjs/toolkit';

// Начальное состояние для среза состояния набора текста
const initialState: ITyping = {
  text: "", // Текущий текст для набора
  userInput: "", // Введенный пользователем текст
  statistic: [], // Статистика набора текста
  time: 30, // Общее время для набора текста
  wpm: 0, // Скорость набора текста в словах в минуту
  timeRemaining: 30, // Оставшееся время
  timerRunning: false, // Флаг для отслеживания состояния таймера
  startTime: null, // Время начала набора текста
  errors: 0, // Количество ошибок
  totalWords: 0, // Общее количество введенных слов
  totalErrors: 0 // Общее количество ошибок
};

// Создаем срез состояния с помощью createSlice
const typingSlice = createSlice({
  name: 'typing', // Название среза состояния
  initialState, // Начальное состояние
  reducers: {
    // Редюсер для обновления ввода пользователя
    updateUserInput(state, action) {
      state.userInput = action.payload; // Обновляем введенный текст
    },
    // Редюсер для установки текста для набора
    setText(state, action) {
      state.text = action.payload; // Устанавливаем текст для набора
    },
    // Редюсер для вычисления количества ошибок
    calculateErrors(state) {
      const expectedWord = state.text.split(' ')[0]; // Ожидаемое слово
      const userInput = state.userInput.split(''); // Введенное пользователем слово

      let errors = 0;
      // Сравниваем введенные символы с ожидаемым словом
      for (let i = 0; i < userInput.length; i++) {
        if (expectedWord[i] !== userInput[i]) {
          errors += 1; // Увеличиваем количество ошибок при несовпадении символов
        }
      }

      // Учитываем лишние символы в вводе
      if (userInput.length > expectedWord.length) {
        errors += userInput.length - expectedWord.length;
      }

      state.errors = errors; // Устанавливаем количество ошибок
    },
    // Редюсер для обработки введенного слова
    processWord(state) {
      if (state.userInput.trim().length > 0) { // Проверка на пустой ввод
        const expectedWord = state.text.split(' ')[0]; // Ожидаемое слово
        const userInput = state.userInput; // Введенное слово

        if (expectedWord == userInput) {
          state.totalWords += 1; // Увеличиваем счетчик введенных слов
          state.text = state.text.replace(/^\s*\S+\s*/, ''); // Убираем введенное слово из текста
          state.userInput = ""; // Очищаем ввод пользователя
        }
      }
    },
    // Редюсер для вычисления скорости набора текста (WPM)
    calculateWPM(state) {
      const currentTime = new Date().getTime();
      const timeElapsed = (currentTime - state.startTime!) / 60000;  // Время в минутах

      if (timeElapsed > 0) {
        state.wpm = Math.floor(state.totalWords / timeElapsed); // Используем totalWords для расчета WPM
      }
    },
    // Редюсер для установки времени начала таймера
    setStartTime(state) {
      if (!state.timerRunning) {
        state.startTime = new Date().getTime(); // Устанавливаем время начала
      }
      state.timerRunning = true; // Запускаем таймер
    },
    // Редюсер для записи статистики
    recordStatistics(state) {
      state.statistic.push({
        name: state.timeRemaining + 1, // Текущий оставшийся период времени
        wpm: state.wpm, // Скорость набора текста
        error: state.errors == 0 ? null : state.errors, // Количество ошибок, если есть
      });
    },
    // Редюсер для сброса состояния
    reset(state) {
      state.userInput = ""; // Очищаем ввод пользователя
      state.errors = 0; // Сбрасываем количество ошибок
      state.wpm = 0; // Сбрасываем скорость набора текста
      state.timerRunning = false; // Останавливаем таймер
      state.timeRemaining = state.time; // Восстанавливаем оставшееся время
      state.startTime = null; // Сбрасываем время начала
      state.statistic = []; // Очищаем статистику
      state.totalWords = 0; // Сбрасываем счетчик введенных слов
      state.totalErrors = 0; // Сбрасываем общее количество ошибок
    },
    // Редюсер для уменьшения времени
    decrementTime(state) {
      if (state.timeRemaining > 0) {
        state.timeRemaining -= 1; // Уменьшаем оставшееся время на 1

        // Пересчитываем WPM и ошибки, обновляем статистику
        typingSlice.caseReducers.calculateWPM(state);
        typingSlice.caseReducers.calculateErrors(state);
        state.totalErrors += state.errors;

        typingSlice.caseReducers.recordStatistics(state);
      } else {
        state.timerRunning = false; // Останавливаем таймер, если время истекло
      }
    },
    // Редусер для изменения времени
    changeTimer(state, actions) {
      state.timeRemaining = actions.payload; // Устанавливаем новое значение оставшегося времени
      state.time = Number(actions.payload); // Устанавливаем новое значение общего времени
    },
  },
});

// Экспортируем действия Редюсера для использования в других частях приложения
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

// Экспортируем Редюсер по умолчанию
export default typingSlice.reducer;