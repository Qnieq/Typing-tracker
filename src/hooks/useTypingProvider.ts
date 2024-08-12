import { TypingContext } from "@/provider/TypingProvider"
import { useContext } from "react"

export const useTypingProvider = () => {
    const context = useContext(TypingContext)

    if (!context) {
        throw new Error(
            'You can use "useReset" hook only within a <TypingProvider> component.'
        );
    }

    return context
}