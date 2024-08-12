import { ISettings, Language } from "@/types/typing.types"
import { createSlice } from "@reduxjs/toolkit"

const initialState: ISettings = {
    active_option: "timer",       // Активная опция, по умолчанию "timer"
    language: Language.RU,        // Язык по умолчанию (например, русский)
}

// Создаем срез для управления состоянием настроек
const settingsSlice = createSlice({
    name: "settingsSlice",        
    initialState,                 
    reducers: {
        // Редьюсер для изменения активной опции
        changeActiveOption(state, actions) {
            state.active_option = actions.payload; // Устанавливаем новое значение для активной опции
        },
        // Редьюсер для изменения языка
        changeLanguage(state, actions) {
            state.language = actions.payload; // Устанавливаем новый язык
        },
    }
})


export const { changeActiveOption, changeLanguage } = settingsSlice.actions
export default settingsSlice.reducer