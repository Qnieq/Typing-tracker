import styles from "./Timer.module.scss"
import { useActions } from "@/hooks/useActions";
import { useTyping } from "@/hooks/useTyping";
import { useEffect } from "react";

const Timer = () => {
    const { decrementTime } = useActions();
    const { typingData } = useTyping();

    useEffect(() => {
        if (typingData.timerRunning && typingData.timeRemaining > 0) {
            const timerId = setInterval(() => {
                decrementTime();
            }, 1000);

            return () => clearInterval(timerId);
        } else if (typingData.timeRemaining === 0) {
            // reset();
        }
    }, [typingData.timerRunning, typingData.timeRemaining]);


    const minutes = Math.floor(typingData.timeRemaining / 60);
    const seconds = typingData.timeRemaining % 60;

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return (
        <div className={styles.timer_box} style={{...!typingData.timerRunning && { opacity: "0", pointerEvents: "none" }}}>
            <h2 className={styles.timer}>
                {minutes}:{formattedSeconds}
            </h2>
        </div>
    );
}

export default Timer;