import { Link } from "react-router-dom";
import styles from "./schedule.module.scss";

const ScheduleItem = ({ index, curDate, schedule, handleClick }) => {
    return (
        <div className="accordion-item border-bottom-0">
            <button className={`d-flex flex-column align-items-start accordion-button collapsed bg-white shadow-none px-0 ${styles.activeBtn}`} type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + index} aria-expanded="false" aria-controls={"collapse" + index}>
                <h5 className={`accordion-header ${styles.title}`} id={"heading" + index}>{schedule.title}</h5>
                <p className={`text-secondary mb-0 ${styles.time}`}>
                    {(schedule.allDay) ? "하루 종일" : (curDate === schedule.startDate ? schedule.startTime + " ~" : (curDate === schedule.endDate ? "~ " + schedule.endTime : "하루 종일"))}
                </p>
                <p className={`mb-0 ${styles.period}`}>
                    {schedule.allDay ? schedule.startDate + " ~ " + schedule.endDate : schedule.startDate + " " + schedule.startTime + " ~ " + schedule.endDate + " " + schedule.endTime}
                </p>
            </button>
            <div id={"collapse" + index} className="accordion-collapse collapse" aria-labelledby={"heading" + index} data-bs-parent="#scheduleList">
                <div className={`accordion-body px-0 pt-2 pb-0 mb-3 ${styles.textBox}`}>
                    {schedule.location ? <div className="d-flex align-items-start">
                        <i className="col bi bi-geo-alt fs-5"></i>
                        <div className="col-11">{schedule.location}</div>
                    </div> : null}
                    {schedule.memo}
                    <div className={"d-flex justify-content-end " + ((schedule.location || schedule.memo) ? "mt-3" : null)}>
                        <Link className="btn btn-light btn-sm border-dark" to={`/schedule/edit/${schedule.id}`}>수정</Link>
                        <button type="button" className="btn btn-crimson btn-sm ms-2" onClick={() => handleClick(schedule.id)}>삭제</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScheduleItem