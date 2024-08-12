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

    const [textareaFocused, setTextareaFocused] = useState<boolean>(true)

    const { typingData } = useTyping()

    const statisticCondition = typingData.statistic.length == typingData.time && typingData.time != 0

    useEffect(() => {
        if (typingData.timerRunning || statisticCondition) {
            document.body.style.background = "var(--bg-hover)";
        } else {
            document.body.style.background = "var(--bg)";
        }
    }, [typingData.timerRunning, statisticCondition]);

    return (
        <main className={styles.main}>
            <BackgroundElements />
            <Header setTextareaFocused={setTextareaFocused} />
            {statisticCondition ?
                <Statistic />
                :
                <>
                    <SettingsPanel />
                    <Timer />
                    <TextSection
                        setTextareaFocused={setTextareaFocused}
                        textareaFocused={textareaFocused}
                    />
                </>
            }
            <ResetButton setTextareaFocused={setTextareaFocused} />
            {!statisticCondition &&
                <SettingsInfo />
            }
        </main>
    );
}

export default Home;