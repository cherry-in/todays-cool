import { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import Date from "./DateSet";
import todoApi from "../../apis/todo.api";
import { useAuth } from "../../utils/context";
import catchErrors from "../../utils/catchErrors";
import moment from 'moment';
import FullCalendar, { createPlugin } from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from '@fullcalendar/bootstrap';

const Weekly = () => {
    const { user } = useAuth()
    const history = useHistory()
    const { date } = useParams()
    const [initialDate, setInitialDate] = useState(moment().format("YYYY-MM-DD"))
    const [chooseDate, setChooseDate] = useState(moment(date).format("YYYY-MM-DD"))
    const [week, setWeek] = useState([
        { date: moment(date).day(0).format("YYYY-MM-DD"), rate: "" },
        { date: moment(date).day(1).format("YYYY-MM-DD"), rate: "" },
        { date: moment(date).day(2).format("YYYY-MM-DD"), rate: "" },
        { date: moment(date).day(3).format("YYYY-MM-DD"), rate: "" },
        { date: moment(date).day(4).format("YYYY-MM-DD"), rate: "" },
        { date: moment(date).day(5).format("YYYY-MM-DD"), rate: "" },
        { date: moment(date).day(6).format("YYYY-MM-DD"), rate: "" }
    ])
    const [error, setError] = useState("")
    const calendarRef = useRef(null)
    let calendar = null
    
    useEffect(() => {
        if (calendarRef && calendarRef.current) {
            calendar = calendarRef.current.getApi()
        }
    })
    
    useEffect(() => {
        setChooseDate(date)
        getTodoList(date)
    }, [date])

    async function getTodoList(date) {
        try {
            setError("")
            let weekArr = []
            const result = await todoApi.getTodopercent(user.id, moment(date).day(0).format("YYYY-MM-DD"), moment(date).day(6).format("YYYY-MM-DD"))
            for (let i = 0; i < 7; i++) {
                const generateDate = moment(date).day(i).format("YYYY-MM-DD")
                const find = result.find(el => el.date === generateDate)
                if (find) weekArr[i] = find
                else weekArr[i] = { date: generateDate, rate: "" }
            }
            setWeek(weekArr)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    function prev() {
        calendar.prev()
        const date = moment(calendar.getDate()).format('YYYY-MM-DD')
        history.push(`/todo/${date}`)
    }

    function next() {
        calendar.next()
        const date = moment(calendar.getDate()).format('YYYY-MM-DD')
        history.push(`/todo/${date}`)
    }

    function gotoDate(date) {
        calendar.gotoDate(date)
        history.push(`/todo/${date}`)
    }

    const CustomeWeeklyView = ({ dateProfile }) => {
        let current = moment(dateProfile.currentRange.start).format("YYYY-MM-DD")

        return (
            <div className="fc-custom-view weekly-view d-flex row-cols-9" style={{ cursor: "pointer" }}>
                <i className="col bi bi-chevron-left align-self-center" onClick={prev} style={{ fontSize: "2em" }} />
                {week.map((info, idx) => <Date index={idx} info={info} today={moment(info.date).isSame(current) ? true : false} handleClick={gotoDate} />)}
                <i className="col bi bi-chevron-right align-self-center" onClick={next} style={{ fontSize: "2em" }} />
            </div>
        )
    }

    const customViewPlugin = createPlugin({
        views: {
            week: CustomeWeeklyView
        }
    })

    return (
        <FullCalendar
            ref={calendarRef}
            plugins={[customViewPlugin, interactionPlugin, bootstrapPlugin]}
            initialView="week"
            initialDate={chooseDate}
            headerToolbar={{
                start: 'title',
                center: '',
                end: ''
            }}
            titleFormat={() => moment(chooseDate).format("YYYY[년 ]MM[월]")}
            views={{
                week: {
                    validRange: {
                        start: moment(initialDate).subtract(3, 'years').format('YYYY-MM[-01]'),
                        end: moment(initialDate).add(3, 'years').add(1, 'months').format('YYYY-MM[-01]')
                    },
                    dateIncrement: {
                        days: 7
                    }
                }
            }}
            timeZone="local"
            themeSystem='bootstrap'
            height="fit-content"
        />
    )
}

export default Weekly