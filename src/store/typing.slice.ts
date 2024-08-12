import { ITyping } from '@/types/typing.types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ITyping = {
  text: "",                  // Текст для набора
  userInput: "",             // Ввод пользователя
  statistic: [],             // Статистика результатов
  time: 30,                  // Общее время на набор (по умолчанию 30 секунд)
  wpm: 0,                    // Скорость набора слов в минуту (WPM)
  timeRemaining: 30,         // Оставшееся время
  timerRunning: false,       // Флаг состояния таймера
  startTime: null,           // Время начала набора
  errors: 0,                 // Количество ошибок
  totalWords: 0,             // Общее количество введенных слов
  totalErrors: 0             // Общее количество ошибок
};

// Создаем срез для управления состоянием набора текста
const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    // Обновляет введенный пользователем текст
    updateUserInput(state, action) {
      state.userInput = action.payload;
    },
    // Устанавливает текст, который нужно набирать
    setText(state, action) {
      state.text = action.payload;
    },
    // Рассчитывает количество ошибок в пользовательском вводе
    calculateErrors(state) {
      const expectedWord = state.text.split(' ')[0];  // Ожидаемое слово (первое слово в тексте)
      const userInput = state.userInput.split('');    // Введенное пользователем слово

      let errors = 0;
      // Сравниваем каждую букву введенного слова с ожидаемым словом
      for (let i = 0; i < userInput.length; i++) {
        if (expectedWord[i] !== userInput[i]) {
          errors += 1;
        }
      }

      // Если введенное слово длиннее ожидаемого, учитываем дополнительные ошибки
      if (userInput.length > expectedWord.length) {
        errors += userInput.length - expectedWord.length;
      }

      state.errors = errors;  // Устанавливаем количество ошибок в состояние
    },
    // Обрабатывает введенное слово (проверяет, совпадает ли оно с ожидаемым)
    processWord(state) {
      if (state.userInput.trim().length > 0) {  // Проверка на пустой ввод
        const expectedWord = state.text.split(' ')[0];
        const userInput = state.userInput;

        if (expectedWord === userInput) {  // Если введенное слово совпадает с ожидаемым
          state.totalWords += 1;           // Увеличиваем счетчик введенных слов
          state.text = state.text.replace(/^\s*\S+\s*/, ''); // Убираем введенное слово из текста
          state.userInput = "";            // Очищаем ввод пользователя
        }
      }
    },
    // Рассчитывает скорость набора слов в минуту (WPM)
    calculateWPM(state) {
      const currentTime = new Date().getTime();
      const timeElapsed = (currentTime - state.startTime!) / 60000;  // Время в минутах

      console.log(state.totalWords / timeElapsed);  // Вывод WPM в консоль для отладки

      if (timeElapsed > 0) {
        state.wpm = Math.floor(state.totalWords / timeElapsed); // Устанавливаем значение WPM
      }
    },
    // Устанавливает время начала таймера
    setStartTime(state) {
      if (!state.timerRunning) {
        state.startTime = new Date().getTime();
      }
      state.timerRunning = true;
    },
    // Записывает статистику (время, WPM, количество ошибок)
    recordStatistics(state) {
      state.statistic.push({
        name: state.timeRemaining + 1,  // Используем оставшееся время для записи
        wpm: state.wpm,
        error: state.errors === 0 ? null : state.errors, // Если ошибок нет, записываем null
      });
    },
    // Сбрасывает состояние среза
    reset(state) {
      state.userInput = "";
      state.errors = 0;
      state.wpm = 0;
      state.timerRunning = false;
      state.timeRemaining = state.time;
      state.startTime = null;
      state.statistic = [];
      state.totalWords = 0;
      state.totalErrors = 0;
    },
    // Уменьшает оставшееся время и обновляет статистику
    decrementTime(state) {
      if (state.timeRemaining > 0) {
        state.timeRemaining -= 1;

        typingSlice.caseReducers.calculateWPM(state);  // Рассчитываем WPM
        typingSlice.caseReducers.calculateErrors(state);  // Рассчитываем ошибки
        state.totalErrors += state.errors;  // Увеличиваем общий счетчик ошибок

        typingSlice.caseReducers.recordStatistics(state);  // Записываем статистику
      } else {
        state.timerRunning = false;  // Останавливаем таймер, если время истекло
      }
    },
    // Изменяет время таймера
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