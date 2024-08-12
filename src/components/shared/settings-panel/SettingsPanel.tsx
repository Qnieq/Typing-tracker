import { useSettings } from "@/hooks/useSettings";
import VariantPanel from "../../ui/variant-panel/VariantPanel";
import styles from "./SettingsPanel.module.scss"
import OptionsPanel from "../../ui/options-panel/OptionsPanel";
import { IOptionsPanelProps } from "../../ui/options-panel/options-panel.types";
import { useEffect, useState } from "react";
import SettingsOptionModule from "../../ui/settings-option-module/SettingsOptionModule";
import { useActions } from "@/hooks/useActions";
import { useTyping } from "@/hooks/useTyping";

const options: IOptionsPanelProps[] = [
    {
        name: "timer",
        value: [15, 30, 60, 120]
    },
    {
        name: "language",
        value: ["ru", "en"]
    },
]

const SettingsPanel = () => {

    const [optionsModuleIsOpen, setOptionsModuleIsOpen] = useState<boolean>(false)
    const [windowWidht, setWindowWidth] = useState<number>(window.innerWidth)

    const { settingsData } = useSettings()
    const { typingData } = useTyping();
    const { changeTimer } = useActions()

    useEffect(() => {
        window.addEventListener("resize", () =>
            setWindowWidth((v) => (v * 0) + window.innerWidth)
        )
        return () => {
            window.removeEventListener("resize", () =>
                setWindowWidth((v) => (v * 0) + window.innerWidth)
            )
        }
    }, [])



    return (
        <section
            className={styles.settings_panel}
            style={{
                ...typingData.timerRunning &&
                { display: "none" },
            }}
        >
            <VariantPanel />
            <div className={styles.line}></div>
            {windowWidht > 600 &&
                options.map((option) => (
                    option.name == settingsData.active_option && (
                        <OptionsPanel name={option.name} value={option.value} />
                    )
                ))
            }
            <button className={styles.btn} onClick={() => setOptionsModuleIsOpen(!optionsModuleIsOpen)}>
                <img
                    src={
                        optionsModuleIsOpen ?
                            "/icons/close.svg"
                            :
                            "/icons/change.svg"
                    }
                    alt=""
                    className={styles.icon} />
            </button>
            <SettingsOptionModule isOpen={optionsModuleIsOpen}>
                <div className={styles.extended_settings}>
                    {options.map((option, index) => (
                        option.name == settingsData.active_option && (
                            <OptionsPanel key={index} name={option.name} value={option.value} />
                        )
                    ))}
                    {settingsData.active_option == "timer" &&
                        <input
                            type="number"
                            value={typingData.time}
                            placeholder="Enter seconds"
                            className={styles.field}
                            onChange={(e) => changeTimer(e.target.value)}
                        />
                    }
                </div>
            </SettingsOptionModule>
        </section>
    );
}

export default SettingsPanel;