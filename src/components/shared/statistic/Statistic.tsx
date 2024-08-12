import { Area, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Scatter, Tooltip, XAxis, YAxis } from "recharts";
import styles from "./Statistic.module.scss"
import { useTyping } from "@/hooks/useTyping";

const Statistic = () => {
    // Получаем данные из хука useTyping
    const { typingData } = useTyping();

    return (
        <section className={styles.statistic}>
            {/* Заголовок секции */}
            <h1 className={styles.title}>
                Results:
            </h1>
            <div className={styles.statistic_info}>
                {/* Блок с результатами */}
                <div className={styles.box}>
                    <h4 className={styles.name}>
                        WPM
                    </h4>
                    <h3 className={styles.info}>
                        {typingData.wpm} {/* Отображение количества слов в минуту */}
                    </h3>
                </div>
                <div className={styles.box}>
                    <h4 className={styles.name}>
                        Errors
                    </h4>
                    <h3 className={styles.info}>
                        {typingData.totalErrors} {/* Отображение общего количества ошибок */}
                    </h3>
                </div>
            </div>
            <div className={styles.chart}>
                {/* График статистики */}
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={typingData.statistic}
                        margin={{
                            top: 5,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid stroke="rgba(245, 245, 245, 0.314)" strokeDasharray="3 3" /> {/* Сетка графика */}
                        <XAxis dataKey="name" stroke="#fff" /> {/* Ось X с подписями */}
                        <YAxis stroke="#fff" /> {/* Ось Y */}
                        <Tooltip /> {/* Подсказка при наведении */}
                        <Legend height={40} /> {/* Легенда графика */}
                        <Scatter dataKey="error" fill="red" /> {/* Диаграмма рассеяния для ошибок */}
                        <Area type="monotone" dataKey="wpm" stroke="#ecc055" fill="#ecc15550" /> {/* График для WPM */}
                    </ComposedChart>
                </ResponsiveContainer>
                {/* Дополнительная информация о графике */}
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