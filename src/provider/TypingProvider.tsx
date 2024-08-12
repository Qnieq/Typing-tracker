import { useActions } from "@/hooks/useActions";
import { useSettings } from "@/hooks/useSettings";
import { useGetRandomWordsMutation } from "@/service/words.service";
import { createContext, useEffect, useState } from "react";
import JsGoogleTranslateFree from "@kreisler/js-google-translate-free";
import { Language } from "@/types/typing.types";
import { ITypingContext } from "./provider.types";


// Создаем контекст для предоставления состояния и функций
export const TypingContext = createContext<ITypingContext>({} as ITypingContext);

// Асинхронная функция для перевода текста с использованием внешнего API
async function translator(value: string, language: Language) {
    // Используем библиотеку для перевода текста
    const translation = await JsGoogleTranslateFree.translate({ from: "en", to: language, text: value });
    return translation;
}

// Компонент провайдера контекста для обработки набора текста и его перевода
const TypingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Состояния для отслеживания необходимости сброса и состояния загрузки текста
    const [isReset, setIsReset] = useState<boolean>(false);
    const [textLoading, setTextLoading] = useState<boolean>(false);

    // Хук для получения случайных слов из API
    const [getRandomWords, { data: randomWords }] = useGetRandomWordsMutation();

    // Хуки для действий и настроек
    const { setText, reset } = useActions();
    const { settingsData } = useSettings();

    // Эффект для получения случайных слов при первом рендере компонента
    useEffect(() => {
        getRandomWords(null);
    }, [getRandomWords]);

    // Эффект для обработки перевода и фильтрации слов при изменении настроек языка или случайных слов
    useEffect(() => {
        if (settingsData.language !== "en" && randomWords) {
            const singleString = randomWords!.join(" ");
            // Получаем перевод текста
            const translation = translator(singleString, settingsData.language);

            // Обрабатываем результат перевода
            translation.then((v) => {
                // Фильтруем слова, оставляя только слова длиной <= 8 символов
                const filteredWords = v.split(' ').filter(word => word.length <= 8);
                // Устанавливаем отфильтрованный текст
                setText(filteredWords.join(' '));
                setTextLoading(false);
            });

        } else if (randomWords) {
            const singleString = randomWords!.join(" ");
            // Фильтруем слова, оставляя только слова длиной <= 8 символов
            const filteredWords = singleString.split(' ').filter(word => word.length <= 8);
            // Устанавливаем отфильтрованный текст
            setText(filteredWords.join(' '));
            setTextLoading(false);
        }
    }, [settingsData.language, randomWords, setText]);

    // Эффект для обработки сброса, получения новых случайных слов и сброса состояния
    useEffect(() => {
        if (isReset) {
            getRandomWords(null);
            reset();
            setIsReset(false);
            setTextLoading(true);
        }
    }, [isReset, getRandomWords, reset]);

    // Возвращаем провайдер контекста с функциями и состоянием
    return (
        <TypingContext.Provider value={{ setIsReset, textLoading }}>
            {children}
        </TypingContext.Provider>
    );
}

export default TypingProvider;