import { useState, useEffect } from "react";
import Item from "../AdminScheduleItem.js";
import scheduleApi from "../../apis/schedule.api";
import catchErrors from "../../utils/catchErrors.js";
import moment from 'moment';
import styles from "./modal.module.scss";

const ScheduleModal = ({ dateShow, setDateShow }) => {
    const [scheduleList, setScheduleList] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        if (dateShow.show) getSchedule()
    }, [dateShow])

    async function getSchedule() {
        try {
            setError("")
            const resList = await scheduleApi.getbyDate(dateShow.date)
            setScheduleList(resList)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function delSchedule(id) {
        try {
            setError("")
            await scheduleApi.remove(id)
            alert("해당 일정을 삭제했습니다.")
            getSchedule()
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <>
            {dateShow.show ? <div className="modal-backdrop fade show"></div> : null}
            <div className={"modal " + (dateShow.show ? "d-block" : "d-none")} id="scheduleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="scheduleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className={`modal-header ${styles.header}`}>
                            <h5 className="modal-title text-white mx-auto" id="scheduleModalLabel">{moment(dateShow.date).format("MM.DD")}</h5>
                            <button type="button" className={`btn-close btn-close-white ms-0 ${styles.closeBtn}`} data-bs-dismiss="modal" aria-label="Close" onClick={() => setDateShow({ ...dateShow, show: false })}></button>
                        </div>
                        <div className={`modal-body text-dark ${styles.body}`}>
                            {scheduleList.length !== 0 ? 
                            scheduleList.map((schedule, idx) => <Item key={idx} schedule={schedule} handleClick={delSchedule} />)
                        : <p className="text-center mb-0">선택한 날짜에 일정이 없습니다.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScheduleModal