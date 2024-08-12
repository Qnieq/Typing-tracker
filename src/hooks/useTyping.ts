import { useTypedSelector } from "./useTypedSelector"

export const useTyping = () => {
    const { typingData } = useTypedSelector(state => state)
    return { typingData }
}