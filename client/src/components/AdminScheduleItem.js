import { Link } from "react-router-dom";
import styles from "./Schedule/schedule.module.scss";

const AdminScheduleItem = ({ schedule, handleClick }) => {

    return (
        <div className="d-flex mb-5">
            <i className="bi bi-check-lg fs-4 col me-2"></i>
            <div className="col-11">
                <div className="d-flex">
                    <h3 className="col-10 rows-cols-2">{schedule.title}</h3>
                    <div className={`d-flex col-2 fs-5 ${styles.cursor}`}>
                        <Link to={`/admin/edit/${schedule.id}`}><i className="bi bi-pencil-square text-dark me-2" data-bs-dismiss="modal"></i></Link>
                        <i className="bi bi-trash" onClick={() => handleClick(schedule.id)}></i>
                    </div>
                </div>
                <p className="text-start text-secondary mb-2">
                    {(schedule.start === schedule.end) ? schedule.start : schedule.start + " ~ " + schedule.end}
                </p>
                <div className={`text-start ${styles.textBox}`}>{schedule.memo}</div>
            </div>
        </div>
    )
}

export default AdminScheduleItem