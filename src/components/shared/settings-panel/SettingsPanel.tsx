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
    // Состояние для управления видимостью панели опций
    const [optionsModuleIsOpen, setOptionsModuleIsOpen] = useState<boolean>(false);

    // Состояние для хранения ширины окна
    const [windowWidht, setWindowWidth] = useState<number>(window.innerWidth);

    // Хуки для получения данных настроек и данных набора текста
    const { settingsData } = useSettings();
    const { typingData } = useTyping();
    const { changeTimer } = useActions();

    // Эффект для отслеживания изменения ширины окна
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <section
            className={styles.settings_panel}
            style={{
                ...typingData.timerRunning && { display: "none" }, // Прячем панель, если таймер запущен
            }}
        >
            <VariantPanel />  {/* Компонент для отображения варианта панелей */}
            <div className={styles.line}></div>
            {/* Отображаем панель опций, если ширина окна больше 600 пикселей */}
            {windowWidht > 600 &&
                options.map((option) => (
                    option.name === settingsData.active_option && (
                        <OptionsPanel key={option.name} name={option.name} value={option.value} />
                    )
                ))
            }
            {/* Кнопка для открытия/закрытия модуля настроек */}
            <button className={styles.btn} onClick={() => setOptionsModuleIsOpen(!optionsModuleIsOpen)}>
                <img
                    src={
                        optionsModuleIsOpen ?
                            "/icons/close.svg" :  // Иконка закрытия, если модуль открыт
                            "/icons/change.svg"  // Иконка открытия, если модуль закрыт
                    }
                    alt="Toggle Settings"
                    className={styles.icon}
                />
            </button>
            {/* Модуль настроек */}
            <SettingsOptionModule isOpen={optionsModuleIsOpen}>
                <div className={styles.extended_settings}>
                    {options.map((option, index) => (
                        option.name === settingsData.active_option && (
                            <OptionsPanel key={index} name={option.name} value={option.value} />
                        )
                    ))}
                    {/* Если активная опция - таймер, отображаем поле ввода для изменения времени */}
                    {settingsData.active_option === "timer" &&
                        <input
                            type="number"
                            value={typingData.time}
                            placeholder="Enter seconds"
                            className={styles.field}
                            onChange={(e) => changeTimer(e.target.value)}  // Обновляем таймер
                        />
                    }
                </div>
            </SettingsOptionModule>
        </section>
    );
}

export default SettingsPanel;