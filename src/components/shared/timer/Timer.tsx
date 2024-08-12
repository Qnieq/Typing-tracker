import styles from "./Timer.module.scss"
import { useActions } from "@/hooks/useActions";
import { useTyping } from "@/hooks/useTyping";
import { useEffect } from "react";

const Timer = () => {
    // Получаем действие для уменьшения времени и данные набора текста
    const { decrementTime } = useActions();
    const { typingData } = useTyping();

    useEffect(() => {
        // Если таймер запущен и остается время, запускаем интервал для уменьшения времени каждую секунду
        if (typingData.timerRunning && typingData.timeRemaining > 0) {
            const timerId = setInterval(() => {
                decrementTime();  // Уменьшаем оставшееся время
            }, 1000);

            // Очищаем интервал при размонтировании компонента или когда таймер останавливается
            return () => clearInterval(timerId);
        }
    }, [typingData.timerRunning, typingData.timeRemaining]);

    // Вычисляем количество минут и секунд из оставшегося времени
    const minutes = Math.floor(typingData.timeRemaining / 60);
    const seconds = typingData.timeRemaining % 60;

    // Форматируем секунды для отображения двухзначного числа
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return (
        <div className={styles.timer_box} 
             style={{ ...!typingData.timerRunning && { opacity: "0", pointerEvents: "none" } }}  // Прячем таймер, если он не запущен
        >
            <h2 className={styles.timer}>
                {minutes}:{formattedSeconds}
            </h2>
        </div>
    );
}

export default Timer;