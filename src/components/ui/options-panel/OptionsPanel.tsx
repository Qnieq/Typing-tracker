import { useTyping } from "@/hooks/useTyping"
import styles from "./OptionsPanel.module.scss"
import { IOptionsPanelProps } from "./options-panel.types"
import { useActions } from "@/hooks/useActions"
import { useSettings } from "@/hooks/useSettings"

const OptionsPanel: React.FC<IOptionsPanelProps> = ({ name, value }) => {

    // Извлекаем действия для изменения языка и таймера
    const { changeLanguage, changeTimer } = useActions();

    // Извлекаем данные настроек и состояния набора текста
    const { settingsData } = useSettings();
    const { typingData } = useTyping();

    // Обработчик клика для изменения языка
    const languageClickHandler = (value: string) => {
        changeLanguage(value); // Изменяем язык
    }

    // Обработчик клика для изменения таймера
    const timerClickHandler = (value: string) => {
        changeTimer(value); // Изменяем таймер
    }

    return (
        <div className={styles.options_box}>
            {value.map((v, index) => (
                <button
                    key={index}
                    style={{
                        ...(settingsData.language === v && { color: "#3b3b3b" }), // Изменяет цвет кнопки, если значение совпадает с текущим языком
                        ...(typingData.time === v && { color: "#3b3b3b" }), // Изменяет цвет кнопки, если значение совпадает с текущим временем таймера
                    }}
                    className={styles.btn}
                    onClick={() => (
                        name === "language" && languageClickHandler(v as string), // Если имя равно "language", вызывается обработчик изменения языка
                        name === "timer" && timerClickHandler(v as string) // Если имя равно "timer", вызывается обработчик изменения таймера
                    )}
                >
                    {v}
                </button>
            ))}
        </div>
    );
}

export default OptionsPanel;