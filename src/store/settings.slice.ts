import { ISettings, Language } from "@/types/typing.types"
import { createSlice } from "@reduxjs/toolkit"

const initialState: ISettings = {
    active_option: "timer",
    language: Language.RU,
}

const settingsSlice = createSlice({
    name: "settingsSlice",
    initialState,
    reducers: {
        changeActiveOption(state, actions) {
            state.active_option = actions.payload
        },
        changeLanguage(state, actions) {
            state.language = actions.payload
        },
    }
})

export const { changeActiveOption, changeLanguage } = settingsSlice.actions
export default settingsSlice.reducer