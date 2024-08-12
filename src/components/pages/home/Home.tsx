import SettingsPanel from "@/components/shared/settings-panel/SettingsPanel";
import styles from "./Home.module.scss"
import BackgroundElements from "@/components/ui/background-elements/BackgroundElements";
import TextSection from "../../shared/text-section/TextSection";
import Timer from "@/components/shared/timer/Timer";
import ResetButton from "@/components/ui/reset-button/ResetButton";
import { useEffect, useState } from "react";
import { useTyping } from "@/hooks/useTyping";
import Statistic from "@/components/shared/statistic/Statistic";
import Header from "@/components/shared/header/Header";
import SettingsInfo from "@/components/ui/settings-info/SettingsInfo";

const Home = () => {
    // Локальное состояние для отслеживания фокуса на текстовом поле
    const [textareaFocused, setTextareaFocused] = useState<boolean>(true);

    // Получаем данные о наборе текста из хука useTyping
    const { typingData } = useTyping();

    // Условие для проверки, нужно ли отображать статистику
    const statisticCondition = typingData.statistic.length === typingData.time && typingData.time !== 0;

    // Эффект для изменения фона страницы в зависимости от состояния таймера и статистики
    useEffect(() => {
        if (typingData.timerRunning || statisticCondition) {
            document.body.style.background = "var(--bg-hover)"; // Устанавливаем фон при активном таймере или если достигнуто статистическое условие
        } else {
            document.body.style.background = "var(--bg)"; // Устанавливаем стандартный фон
        }
    }, [typingData.timerRunning, statisticCondition]);

    return (
        <main className={styles.main}>
            <BackgroundElements /> {/* Фоновые элементы страницы */}
            <Header setTextareaFocused={setTextareaFocused} /> {/* Заголовок с возможностью управления фокусом текстового поля */}
            {statisticCondition ? (
                <Statistic /> // Отображаем статистику, если выполнено условие
            ) : (
                <>
                    <SettingsPanel /> {/* Панель настроек */}
                    <Timer /> {/* Таймер */}
                    <TextSection
                        setTextareaFocused={setTextareaFocused} // Передаем функцию для управления фокусом текстового поля
                        textareaFocused={textareaFocused} // Передаем текущее состояние фокуса текстового поля
                    />
                </>
            )}
            <ResetButton setTextareaFocused={setTextareaFocused} /> {/* Кнопка сброса */}
            {/* Информация о настройках, отображается, если условие статистики не выполнено */}
            {!statisticCondition && (
                <SettingsInfo />
            )} 
        </main>
    );
}

export default Home;