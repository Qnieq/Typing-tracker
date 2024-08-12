import { useActions } from "@/hooks/useActions";
import { useSettings } from "@/hooks/useSettings";
import { useGetRandomWordsMutation } from "@/service/words.service";
import { createContext, useEffect, useState } from "react";
import JsGoogleTranslateFree from "@kreisler/js-google-translate-free";
import { Language } from "@/types/typing.types";
import { ITypingContext } from "./provider.types";


export const TypingContext = createContext<ITypingContext>({} as ITypingContext);

async function translator(value: string, language: Language) {
    const translation = await JsGoogleTranslateFree.translate({ from: "en", to: language, text: value });
    return translation
}

const TypingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [isReset, setIsReset] = useState<boolean>(false)
    const [textLoading, setTextLoading] = useState<boolean>(false)

    const [getRandomWords, { data: randomWords }] = useGetRandomWordsMutation()

    const { setText, reset } = useActions()
    const { settingsData } = useSettings()

    useEffect(() => {
        getRandomWords(null)
    }, [])

    useEffect(() => {
        if (settingsData.language !== "en" && randomWords) {
            const singleString = randomWords!.join(" ");
            const translation = translator(singleString, settingsData.language);

            translation.then((v) => {
                const filteredWords = v.split(' ').filter(word => word.length <= 8);
                setText(filteredWords.join(' '));
                setTextLoading(false)
            });

        } else if (randomWords) {
            const singleString = randomWords!.join(" ");

            const filteredWords = singleString.split(' ').filter(word => word.length <= 8);
            setText(filteredWords.join(' '));
            setTextLoading(false)
        }
    }, [settingsData.language, randomWords]);

    useEffect(() => {
        if (isReset) {
            getRandomWords(null)
            reset()
            setIsReset(false)
            setTextLoading(true)
        }
    }, [isReset])

    return (
        <TypingContext.Provider value={{ setIsReset, textLoading }}>
            {children}
        </TypingContext.Provider>
    );
}

export default TypingProvider;