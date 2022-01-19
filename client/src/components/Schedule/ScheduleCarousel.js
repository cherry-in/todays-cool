import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import KU from "./KUSchedule.js";
import scheduleApi from "../../apis/schedule.api";
import catchErrors from "../../utils/catchErrors";

const ScheduleCarousel = () => {
    const [scheduleList, setScheduleList] = useState([])
    const [error, setError] = useState("")
    const { date } = useParams()

    useEffect(() => {
        getSchedule(date)
    }, [date])

    async function getSchedule(date) {
        try {
            setError("")
            const resList = await scheduleApi.getbyDate(date)
            setScheduleList(resList)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <div id="scheduleListCarousel" className="carousel carousel-dark slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {scheduleList.length !== 0 ?
                    scheduleList.map((schedule, idx) =>
                        <div className={"carousel-item" + (idx === 0 ? " active" : " ")}>
                            <KU schedule={schedule} />
                        </div>) : null}
            </div>
            {scheduleList.length > 1 ? <>
                <button className="carousel-control-prev" type="button" data-bs-target="#scheduleListCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#scheduleListCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </> : null}
        </div>
    )
}

export default ScheduleCarousel