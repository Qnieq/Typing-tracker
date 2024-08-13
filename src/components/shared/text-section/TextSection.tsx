import { useTyping } from "@/hooks/useTyping";
import styles from "./TextSection.module.scss"
import { useActions } from "@/hooks/useActions";
import { useEffect, useRef, useState } from "react";
import { ITextSectionProps } from "./text-section.types";
import { useTypingProvider } from "@/hooks/useTypingProvider";
import { AnimatePresence, motion } from "framer-motion";

const TextSection: React.FC<ITextSectionProps> = ({ setTextareaFocused, textareaFocused }) => {
    // Получаем действия и данные из хуков
    const { updateUserInput, setText, processWord, setStartTime } = useActions();
    const { typingData } = useTyping();
    const { textLoading } = useTypingProvider();

    // Состояние для ширины буквы
    const [letterWidth, setLetterWidth] = useState<number>(0);

    // Ссылки на элементы
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const letterRef = useRef<HTMLSpanElement>(null);

    // Обработчик изменения ввода в текстовую область
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let value = e.target.value;
        const expectedWord = typingData.text.split(' ')[0];  // Ожидаемое слово
        const userWord = value.split(' ')[0];  // Введенное слово
        const lastChar = value[value.length - 1];  // Последний символ ввода

        // Если введенное слово и ожидаемое слово совпадают и последним символом является пробел
        if (value.length === expectedWord.length + 1 && lastChar === ' ') {
            processWord();  // Обрабатываем введенное слово
            setText(typingData.text.replace(/^\s*\S+\s*/, ''));  // Удаляем обработанное слово из текста
            value = '';  // Очищаем ввод
        } else if (userWord === "") {
            value = userWord;  // Обрабатываем случай пустого ввода
        } else if (value.length > expectedWord.length) {
            value = value.slice(0, expectedWord.length);  // Ограничиваем длину ввода
        }

        // Если таймер не запущен и текстовая область находится в фокусе, устанавливаем время начала
        if (!typingData.timerRunning && textareaFocused) {
            setStartTime();
        }

        // Обновляем ввод пользователя
        updateUserInput(value);
    };

    // Эффект для обработки фокуса и потери фокуса текстовой области
    useEffect(() => {
        const handleFocus = () => setTextareaFocused(true);
        const handleBlur = () => setTextareaFocused(false);

        const textarea = textareaRef.current;

        // Если текстовая область должна быть в фокусе, устанавливаем фокус
        if (textareaFocused) {
            textarea?.focus();
        }

        if (textarea) {
            textarea.addEventListener('focus', handleFocus);
            textarea.addEventListener('blur', handleBlur);
        }

        return () => {
            if (textarea) {
                textarea.removeEventListener('focus', handleFocus);
                textarea.removeEventListener('blur', handleBlur);
            }
        };
    }, [textareaFocused]);

    // Эффект для вычисления ширины буквы
    useEffect(() => {
        if (letterRef.current) {
            const { width } = letterRef.current.getBoundingClientRect();
            setLetterWidth(width);
        }
    }, [letterRef.current]);

    return (
        <section className={styles.text_section}>
            <div
                className={styles.text_hint}
                style={{ ...!textareaFocused && { filter: "blur(4px)" } }}  // Применяем размытие, если текстовая область не в фокусе
            >
                {typingData.text.split('').map((char, index) => {
                    const userChar = typingData.userInput.split('')[index] || '';
                    const isCorrect = char === userChar;

                    return (
                        <span
                            ref={letterRef}
                            key={index}
                            className={!textLoading ? styles.hint : `${styles['hint-skeleton']}`}  // Применяем класс в зависимости от состояния загрузки текста
                            style={{
                                color: isCorrect ? 'white' : userChar === '' ? 'rgba(255, 255, 255, 0.4)' : 'red',  // Устанавливаем цвет буквы в зависимости от правильности
                            }}
                        >
                            {char}
                        </span>
                    );
                })}
                <span
                    className={styles.indicator}
                    style={!textareaFocused ?
                        { display: "none" }  // Прячем индикатор, если текстовая область не в фокусе
                        :
                        {
                            left: `${typingData.userInput.length * letterWidth}px`,  // Устанавливаем позицию индикатора в зависимости от длины введенного текста
                        }}
                />
            </div>
            <AnimatePresence>
                {!textareaFocused &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.text_notice}
                    >
                        <h3 className={styles.notice}>
                            Click to focus  {/* Уведомление для фокусировки текстовой области */}
                        </h3>
                    </motion.div>
                }
            </AnimatePresence>
            <textarea
                autoFocus  // Автоматически устанавливает фокус на текстовую область при рендере
                ref={textareaRef}  // Присваиваем ссылку на текстовую область
                value={typingData.userInput}  // Устанавливаем значение из состояния
                onChange={handleInputChange}  // Обрабатываем изменения ввода
                rows={3}  // Устанавливаем высоту текстовой области
                className={styles.field}  // Применяем стили
            />
        </section>
    );
};

export default TextSection;