import { AnimatePresence, motion } from "framer-motion";
import { ISettingsModuleProps } from "./settings-option-module.types";
import styles from "./SettingsOptionModule.module.scss"

const SettingsOptionModule: React.FC<ISettingsModuleProps> = ({ children, isOpen }) => {
    return (
        <AnimatePresence>
            {isOpen &&
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={styles.setting_module}
                >
                    {children}
                </motion.section>
            }
        </AnimatePresence>
    );
}

export default SettingsOptionModule;