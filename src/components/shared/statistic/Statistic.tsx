import { Area, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Scatter, Tooltip, XAxis, YAxis } from "recharts";
import styles from "./Statistic.module.scss"
import { useTyping } from "@/hooks/useTyping";

const Statistic = () => {

    const { typingData } = useTyping()

    return (
        <section className={styles.statistic}>
            <h1 className={styles.title}>
                Results:
            </h1>
            <div className={styles.statistic_info}>
                <div className={styles.box}>
                    <h4 className={styles.name}>
                        WPM
                    </h4>
                    <h3 className={styles.info}>
                        {typingData.wpm}
                    </h3>
                </div>
                <div className={styles.box}>
                    <h4 className={styles.name}>
                        Erorrs
                    </h4>
                    <h3 className={styles.info}>
                        {typingData.totalErrors}
                    </h3>
                </div>
            </div>
            <div className={styles.chart}>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={typingData.statistic}
                        margin={{
                            top: 5,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid stroke="rgba(245, 245, 245, 0.314)" strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip />
                        <Legend height={40} />
                        <Scatter dataKey="error" fill="red" />
                        <Area type="monotone" dataKey="wpm" stroke="#ecc055" fill="#ecc15550" />
                    </ComposedChart>
                </ResponsiveContainer>
                <div className={styles.chart_info_box}>
                    <h6 className={styles.chart_info}>
                        Words per minute
                    </h6>
                </div>
            </div>
        </section>
    );
}

export default Statistic;