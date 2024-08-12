import { useTypingProvider } from "@/hooks/useTypingProvider";
import styles from "./Header.module.scss"
import { IHeaderProps } from "./header.types";

const Header: React.FC<IHeaderProps> = ({ setTextareaFocused }) => {

    const { setIsReset } = useTypingProvider()

    return (
        <header className={styles.header}>
            <div className={styles.logo_box} onClick={() => (setIsReset(true), setTextareaFocused(true))}>
                <img src="/icons/logo.svg" alt="" className={styles.box} />
            </div>
        </header>
    );
}

export default Header;