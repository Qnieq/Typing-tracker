import { useState } from "react";
import { IResetButtonProps } from "./reset-button.types";
import styles from "./ResetButton.module.scss"
import { useTypingProvider } from "@/hooks/useTypingProvider";
import { AnimatePresence, motion } from "framer-motion";

const ResetButton: React.FC<IResetButtonProps> = ({ setTextareaFocused }) => {

    // Локальное состояние для отслеживания, находится ли курсор мыши над кнопкой
    const [hover, setHover] = useState<boolean>(false);

    // Получаем функцию для сброса состояния из хука useTypingProvider
    const { setIsReset } = useTypingProvider();

    return (
        <button
            className={styles.timer_btn} // Применяем стили к кнопке
            onMouseEnter={() => { setHover(true); }} // Устанавливаем hover в true при наведении мыши
            onMouseLeave={() => { setHover(false); }} // Устанавливаем hover в false при уходе мыши
            onClick={() => {
                setIsReset(true); // Устанавливаем состояние сброса в true
                setTextareaFocused(true); // Устанавливаем фокус на текстовое поле
            }}
        >
            <img src="/icons/reload.svg" alt="" className={styles.icon} /> {/* Иконка перезагрузки */}
            <AnimatePresence>
                {hover && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={styles.hint}
                    > {/* Подсказка появляется при наведении мыши */}
                        <h4 className={styles.hint_title}>
                            Reset
                        </h4>
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
}

export default ResetButton;