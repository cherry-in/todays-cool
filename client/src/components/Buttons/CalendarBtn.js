import styles from "./buttons.module.scss";

const CalendarBtn = ({ date }) => {
    return (
        <div className={`d-inline-block position-relative text-center ${styles.calendar}`}>
            <strong className="position-absolute top-0 text-white">Today</strong>
            <span>{date}</span>
        </div>
    )
}

export default CalendarBtn