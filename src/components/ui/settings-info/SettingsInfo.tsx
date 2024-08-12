import { useTyping } from "@/hooks/useTyping";
import styles from "./SettingsInfo.module.scss"
import { useSettings } from "@/hooks/useSettings";

const SettingsInfo = () => {

    const { typingData } = useTyping()
    const { settingsData } = useSettings()

    return (
        <div className={styles.settings_info}>
            <h4 className={styles.title}>
                Session settings
            </h4>
            <div className={styles.content}>
                <div className={styles.info_box}>
                    <h5 className={styles.name}>Seconds:</h5>
                    <p className={styles.info}>{typingData.time}</p>
                </div>
                <div className={styles.info_box}>
                    <h5 className={styles.name}>Language:</h5>
                    <p className={styles.info}>{settingsData.language}</p>
                </div>
            </div>
        </div>
    );
}

export default SettingsInfo;