import { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import BtnGroup from "../Buttons/BtnGroup";
import scheduleApi from "../../apis/schedule.api";
import { useAuth } from "../../utils/context";
import catchErrors from "../../utils/catchErrors";
import styles from "./form.module.scss";

const ScheduleForm = () => {
    const { user } = useAuth()
    const [schedule, setSchedule] = useState({
        title: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        allDay: user.role === "admin" ? "on" : "",
        location: "",
        memo: ""
    })
    const [disabled, setDisabled] = useState(true)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")
    const { scheduleId } = useParams()

    useEffect(() => {
        if (scheduleId) getOne(scheduleId)
    }, [])

    useEffect(() => {
        let isMounted = true;
        const checkInfo = { title: schedule.title, startDate: schedule.startDate, endDate: schedule.endDate }
        if (schedule.allDay !== "on") {
            checkInfo.startTime = schedule.startTime
            checkInfo.endTime = schedule.endTime
        } else {
            delete checkInfo.startTime
            delete checkInfo.endTime
        }
        if (isMounted) {
            const isSchedule = Object.values(checkInfo).every((el) => Boolean(el));
            isSchedule ? setDisabled(false) : setDisabled(true);
        }
        return () => {
            isMounted = false;
        };
    }, [schedule])

    async function getOne(id) {
        try {
            setError("")
            let resSchedule = null
            if (user.role === "admin") resSchedule = await scheduleApi.getOne(id)
            else resSchedule = await scheduleApi.getOne(id, user.id)
            setSchedule({ ...schedule, ...resSchedule })
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    function handleChange(e) {
        const { name, value } = e.target
        if (name === "allDay") {
            schedule.allDay !== "on" ? setSchedule({ ...schedule, [name]: value }) : setSchedule({ ...schedule, [name]: "off" })
        } else if (name === "startDate") {
            setSchedule({ ...schedule, [name]: value, endDate: value })
        } else if (name === "startTime") {
            setSchedule({ ...schedule, [name]: value, endTime: value })
        } else setSchedule({ ...schedule, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            if (scheduleId) {
                if (user.role === "admin") await scheduleApi.edit(scheduleId, schedule)
                else await scheduleApi.edit(scheduleId, schedule, user.id)
                alert('해당 일정이 성공적으로 수정되었습니다.')
            }
            else {
                if (user.role === "admin") await scheduleApi.submit(schedule)
                else await scheduleApi.submit(schedule, user.id)
                alert('해당 일정이 성공적으로 등록되었습니다.')
            }
            setSuccess(true)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    if (success) {
        if (user.role === "admin") return <Redirect to="/admin" />
        else return <Redirect to="/home" />
    }

    return (
        <form className="pt-5">
            <div>
                <input className={`form-control form-control-lg shadow-none rounded-0 px-1 mb-5 ${styles.textInput}`} type="text" name="title" value={schedule.title} placeholder="제목" aria-label="title" onChange={handleChange} autoFocus autoComplete="off" />
            </div>
            <div className="d-flex mb-4">
                <label className="col col-form-label align-self-center py-0">시작</label>
                <div className={(user.role === "admin" || schedule.allDay === "on") ? "col-7" : "col-5"}>
                    <input className={`form-control shadow-none ${styles.dateInput}`} type="date" name="startDate" value={schedule.startDate} aria-label="startDate" onChange={handleChange} />
                </div>
                <div className={"col-5 " + ((user.role === "admin" || schedule.allDay === "on") ? "d-none" : "d-block")}>
                    <input className={`form-control shadow-none ${styles.dateInput}`} type="time" name="startTime" value={schedule.startTime} aria-label="startTime" onChange={handleChange} />
                </div>
            </div>
            <div className={"d-flex " + (user.role === "admin" ? "mb-5" : "mb-3")}>
                <label className="col col-form-label align-self-center py-0">종료</label>
                <div className={(user.role === "admin" || schedule.allDay === "on") ? "col-7" : "col-5"}>
                    <input className={`form-control shadow-none ${styles.dateInput}`} type="date" name="endDate" value={schedule.endDate} aria-label="endDate" onChange={handleChange} />
                </div>
                <div className={"col-5 " + ((user.role === "admin" || schedule.allDay === "on") ? "d-none" : "d-block")}>
                    <input className={`form-control shadow-none ${styles.dateInput}`} type="time" name="endTime" value={schedule.endTime} aria-label="endTime" onChange={handleChange} />
                </div>
            </div>
            <div className={"d-flex justify-content-end form-check mb-4 " + (user.role === "admin" ? "d-none" : "d-block")}>
                <input className={`form-check-input shadow-none ${styles.checkBox}`} type="checkbox" id="allDay" name="allDay" onChange={handleChange} checked={schedule.allDay === "on" ? true : false} />
                <label className="form-check-label ms-2" htmlFor="allDay">하루 종일</label>
            </div>
            <div className={"d-flex justify-content-between align-items-center mb-4 " + (user.role === "admin" ? "d-none" : "d-block")}>
                <i className="col bi bi-geo-alt fs-3"></i>
                <div className="col-10">
                    <input className={`form-control shadow-none rounded-0 px-1 ${styles.textInput}`} type="text" name="location" value={schedule.location} placeholder="장소" aria-label="location" onChange={handleChange} autoComplete="off" />
                </div>
            </div>
            <div className="d-flex justify-content-between mb-5">
                <i className="col bi bi-journal-text fs-3"></i>
                <div className="col-10">
                    <textarea className={`form-control shadow-none ${styles.textArea}`} name="memo" value={schedule.memo} rows="5" onChange={handleChange}></textarea>
                </div>
            </div>
            <BtnGroup text={scheduleId} disabled={disabled} handleSubmit={handleSubmit} />
        </form>
    )
}

export default ScheduleForm