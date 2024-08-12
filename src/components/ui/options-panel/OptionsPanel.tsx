import { useTyping } from "@/hooks/useTyping"
import styles from "./OptionsPanel.module.scss"
import { IOptionsPanelProps } from "./options-panel.types"
import { useActions } from "@/hooks/useActions"
import { useSettings } from "@/hooks/useSettings"

const OptionsPanel: React.FC<IOptionsPanelProps> = ({ name, value }) => {


    const { changeLanguage, changeTimer } = useActions()
    const { settingsData } = useSettings()
    const { typingData } = useTyping()


    const languageClickHandler = (value: string) => {
        changeLanguage(value)
    }

    const timerClickHandler = (value: string) => {
        changeTimer(value)
    }

    return (
        <div className={styles.options_box}>
            {value.map((v) => (
                <button
                    style={{
                        ...(settingsData.language == v && { color: "#3b3b3b" }),
                        ...(typingData.time == v && { color: "#3b3b3b" }),
                    }}
                    className={styles.btn}
                    onClick={() => (
                        name == "language" && languageClickHandler(v as string),
                        name == "timer" && timerClickHandler(v as string)
                    )}
                >
                    {v}
                </button>
            ))}
        </div>
    );
}

export default OptionsPanel;