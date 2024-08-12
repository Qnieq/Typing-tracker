import { useActions } from "@/hooks/useActions"
import styles from "./VarianPanel.module.scss"
import { useSettings } from "@/hooks/useSettings"

const variants: { name: string, icon: string }[] = [
    {
        name: "timer",
        icon: "/icons/timer.svg"
    },
    {
        name: "language",
        icon: "/icons/language.svg"
    },
]

const VariantPanel = () => {

    const { changeActiveOption } = useActions()
    const { settingsData } = useSettings()

    const handleClick = (name: string) => {
        changeActiveOption(name)
    }

    return (
        <div className={styles.variants}>
            {variants.map((variant) => (
                <button
                    style={settingsData.active_option == variant.name ?
                        { color: "#3b3b3b" } : {}
                    }
                    className={styles.variant_btn}
                    onClick={() => handleClick(variant.name)}
                >
                    <img
                        style={settingsData.active_option == variant.name ? { opacity: "0.5" } : {}}
                        src={variant.icon} alt=""
                        className={styles.icon}
                    />
                    {variant.name}
                </button>
            ))}
        </div>
    );
}

export default VariantPanel;