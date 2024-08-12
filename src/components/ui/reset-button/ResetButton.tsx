import { useState } from "react";
import { IResetButtonProps } from "./reset-button.types";
import styles from "./ResetButton.module.scss"
import { useTypingProvider } from "@/hooks/useTypingProvider";

const ResetButton: React.FC<IResetButtonProps> = ({ setTextareaFocused }) => {

    const [hover, setHover] = useState<boolean>(false)

    const { setIsReset } = useTypingProvider()

    return (
        <button
            className={styles.timer_btn}
            onMouseEnter={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
            onClick={() => (setIsReset(true), setTextareaFocused(true))}
        >
            <img src="/icons/reload.svg" alt="" className={styles.icon} />

            {hover &&
                <div className={styles.hint}>
                    <h4 className={styles.hint_title}>
                        Reset
                    </h4>
                </div>
            }
        </button>
    );
}

export default ResetButton;