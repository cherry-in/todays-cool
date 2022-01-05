import moment from 'moment';
import styles from "./calendar.module.scss";

const DateSet = ({ index, info, today, handleClick }) => {
    const week = ['일', '월', '화', '수', '목', '금', '토']

    return (
        <div className="col d-flex flex-column text-center" onClick={() => handleClick(info.date)}>
            <span className="text-center">{week[index]}</span>
            <span className={today ? `rounded-circle ${styles.today}` : ""}>{moment(info.date).format("DD")}</span>
            <span className="text-secondary">{info.rate !== "" ? info.rate + "%" : null}</span>
        </div>
    )
}

export default DateSet