import { useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import customViewPlugin from "./CustomView";
import bootstrapPlugin from '@fullcalendar/bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';

const DateView = ({ }) => {
    const calendarRef = useRef(null)
    const { date } = useParams()
    const history = useHistory()
    let calendar = null

    useEffect(() => {
        if (calendarRef && calendarRef.current) {
            calendar = calendarRef.current.getApi()
        }
    })

    return (
        <FullCalendar
            ref={calendarRef}
            plugins={[bootstrapPlugin, customViewPlugin]}
            initialView="date"
            initialDate={date}
            headerToolbar={{
                start: 'prev',
                center: 'myCustomButton',
                end: 'next'
            }}
            customButtons={{
                myCustomButton: {
                    text: moment(date).format("MM.DD"),
                    click: () => history.push("/home")
                },
                prev: {
                    icon: "fa-chevron-left",
                    click: () => {
                        calendar.prev()
                        let date = moment(calendar.getDate()).format('YYYY-MM-DD')
                        history.push(`/schedule/${date}`)
                    }
                },
                next: {
                    icon: "fa-chevron-right",
                    click: () => {
                        calendar.next()
                        let date = moment(calendar.getDate()).format('YYYY-MM-DD')
                        history.push(`/schedule/${date}`)
                    }
                }
            }}
            timeZone="local"
            themeSystem='bootstrap'
        />
    )
}

export default DateView