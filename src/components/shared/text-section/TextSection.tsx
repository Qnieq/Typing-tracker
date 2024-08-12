import { useTyping } from "@/hooks/useTyping";
import styles from "./TextSection.module.scss"
import { useActions } from "@/hooks/useActions";
import { useEffect, useRef, useState } from "react";
import { ITextSectionProps } from "./text-section.types";
import { useTypingProvider } from "@/hooks/useTypingProvider";

const TextSection: React.FC<ITextSectionProps> = ({ setTextareaFocused, textareaFocused }) => {

    const { updateUserInput, setText, processWord, setStartTime } = useActions();
    const { typingData } = useTyping();
    const { textLoading } = useTypingProvider()

    const [letterWidth, setLetterWidth] = useState<number>(0)

    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const letterRef = useRef<HTMLSpanElement>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let value = e.target.value;
        const expectedWord = typingData.text.split(' ')[0];
        const userWord = value.split(' ')[0];
        const lastChar = value[value.length - 1];

        if (value.length === expectedWord.length + 1 && lastChar === ' ') {
            processWord()
            setText(typingData.text.replace(/^\s*\S+\s*/, ''));
            value = '';
        } else if (userWord == "") {
            value = userWord;
        } else if (value.length > expectedWord.length) {
            value = value.slice(0, expectedWord.length);
        }

        if (!typingData.timerRunning && textareaFocused) {
            setStartTime()
        }

        updateUserInput(value);
    };

    useEffect(() => {
        const handleFocus = () => (setTextareaFocused(true), console.log(textareaFocused));
        const handleBlur = () => (setTextareaFocused(false), console.log(textareaFocused));

        const textarea = textareaRef.current;

        if (textareaFocused) {
            textarea?.focus()
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
    }, [textareaRef, textareaFocused]);

    useEffect(() => {
        if (letterRef.current) {
            const { width } = letterRef.current.getBoundingClientRect()
            setLetterWidth((v) => (v! * 0) + width)
        }
    }, [letterRef.current])

    return (
        <section className={styles.text_section}>
            <div
                className={styles.text_hint}
                style={{ ...!textareaFocused && { filter: "blur(4px)" } }}
            >
                {typingData.text.split('').map((char, index) => {
                    const userChar = typingData.userInput.split('')[index] || '';
                    const isCorrect = char === userChar;

                    return (
                        <span
                            ref={letterRef}
                            key={index}
                            className={!textLoading ? styles.hint : `${styles['hint-skeleton']}`}
                            style={{
                                color: isCorrect ? 'white' : userChar === '' ? 'rgba(255, 255, 255, 0.4)' : 'red',
                            }}
                        >
                            {char}
                        </span>
                    );
                })}
                <span
                    className={styles.indicator}
                    style={!textareaFocused ?
                        { display: "none" }
                        :
                        {
                            left: `${typingData.userInput.length * letterWidth}px`,
                        }}
                />
            </div>
            {!textareaFocused &&
                <div className={styles.text_notice}>
                    <h3 className={styles.notice}>
                        Click to focus
                    </h3>
                </div>
            }
            <textarea
                autoFocus
                ref={textareaRef}
                value={typingData.userInput}
                onChange={handleInputChange}
                rows={3}
                className={styles.field}
            />
        </section>
    );
};

export default TextSection;