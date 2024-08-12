import { ISettingsModuleProps } from "./settings-option-module.types";
import styles from "./SettingsOptionModule.module.scss"

const SettingsOptionModule: React.FC<ISettingsModuleProps> = ({ children, isOpen }) => {
    return (
        <>
            {isOpen &&
                <section className={styles.setting_module}>
                    {children}
                </section>
            }
        </>
    );
}

export default SettingsOptionModule;