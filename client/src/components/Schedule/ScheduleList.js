import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Item from "./ScheduleItem";
import scheduleApi from "../../apis/schedule.api";
import { useAuth } from "../../utils/context";
import catchErrors from "../../utils/catchErrors";
import moment from 'moment';
import styles from "./schedule.module.scss";

const ScheduleList = () => {
    const [scheduleList, setScheduleList] = useState([])
    const [error, setError] = useState("")
    const { date } = useParams()
    const { user } = useAuth()

    useEffect(() => {
        getAll(date)
    }, [date])

    async function getAll(date) {
        try {
            setError("")
            const resList = await scheduleApi.getbyDate(date, user.id)
            setScheduleList(resList)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function delSchedule(id) {
        try {
            setError("")
            await scheduleApi.remove(id, user.id)
            alert("해당 일정을 성공적으로 삭제하였습니다.")
            getAll(date)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <div className={styles.list}>
            <div className="accordion accordion-flush" id="scheduleList">
                {scheduleList.length !== 0 ?
                scheduleList.map((schedule, idx) => <Item key={idx} index={idx} curDate={moment(date).format("YY.MM.DD")} schedule={schedule} handleClick={delSchedule} />)
                : <div className="text-center text-secondary mt-2">오늘 등록된 일정이 없습니다.</div>}
            </div>
        </div>
    )
}

export default ScheduleList