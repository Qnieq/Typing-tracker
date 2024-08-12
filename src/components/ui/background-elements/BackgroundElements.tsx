import styles from "./BackgroundElements.module.scss"

const BackgroundElements = () => {
    return (
        <div className={styles.elements_box}>
            <img src="/icons/bg-element-right-top.svg" alt="" className={styles.element} />
            <img src="/icons/bg-element-left-top.svg" alt="" className={styles.element} />
            <img src="/icons/bg-element-right-center.svg" alt="" className={styles.element} />
            <img src="/icons/bg-element-left-bottom.svg" alt="" className={styles.element} />
        </div>
    );
}

export default BackgroundElements;