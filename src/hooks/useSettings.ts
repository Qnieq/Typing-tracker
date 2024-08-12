import { useTypedSelector } from "./useTypedSelector"

export const useSettings = () => {
    const { settingsData } = useTypedSelector(state => state)
    return { settingsData }
}