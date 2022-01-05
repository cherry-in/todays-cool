import { useState, useEffect, useRef } from "react";
import CalendarBtn from "../Buttons/CalendarBtn";
import DatePickerModal from "../Modal/DatePickerModal";
import ScheduleModal from "../Modal/ScheduleModal";
import scheduleApi from "../../apis/schedule.api";
import catchErrors from "../../utils/catchErrors";
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from '@fullcalendar/bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';

const AdminMonthly = () => {
    const [initialDate, setInitialDate] = useState(moment().format('YYYY-MM-DD'))
    const [changeDate, setChangeDate] = useState(moment().format('YYYY-MM-DD'))
    const [pickerShow, setPickerShow] = useState(false)
    const [dateShow, setDateShow] = useState({ date: moment().format('YYYY-MM-DD'), show: false })
    const [scheduleList, setScheduleList] = useState([])
    const [error, setError] = useState("")
    const calendarRef = useRef(null)
    const calenIconRef = useRef(null)
    let calendar = null

    useEffect(() => {
        if (calendarRef && calendarRef.current) {
            calendar = calendarRef.current.getApi()
        }
    })

    useEffect(() => {
        getAll()
        return () => {
            getAll()
        }
    }, [dateShow.show])

    useEffect(() => {
        if (calenIconRef && calenIconRef.current) {
            calenIconRef.current.addEventListener('click', () => {
                calendar.today()
                let date = moment(calendar.getDate()).format('YYYY-MM-DD')
                setChangeDate(date)
            })
        }
        return () => {
            if (calenIconRef && calenIconRef.current) {
                calenIconRef.current.removeEventListener('click', () => {
                    calendar.today()
                    let date = moment(calendar.getDate()).format('YYYY-MM-DD')
                    setChangeDate(date)
                })
            }
        }
    }, [calenIconRef.current])

    useEffect(() => {
        calendar.gotoDate(changeDate)
        getAll()
    }, [changeDate])

    useEffect(() => {
        calendar.removeAllEvents()
        calendar.addEventSource(scheduleList)
    }, [scheduleList])

    async function getAll() {
        try {
            setError("")
            const resList = await scheduleApi.getbyMonth(changeDate)
            setScheduleList(resList)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <>
            <div ref={calenIconRef} className="position-absolute" style={{ top: "7px", left: "7px" }}>
                <CalendarBtn date={moment(initialDate).format('DD')} />
            </div>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin, bootstrapPlugin]}
                initialView="dayGridMonth"
                initialDate={initialDate}
                headerToolbar={{
                    start: 'prev',
                    center: 'myCustomButton',
                    end: 'next'
                }}
                dayHeaderContent={(date) => {
                    const weekList = ["일", "월", "화", "수", "목", "금", "토"]
                    return weekList[date.dow]
                }}
                views={{
                    dayGridMonth: {
                        dayMaxEvents: 3
                    }
                }}
                validRange={{
                    start: moment(initialDate).subtract(3, 'years').format('YYYY-MM[-01]'),
                    end: moment(initialDate).add(3, 'years').add(1, 'months').format('YYYY-MM[-01]')
                }}
                customButtons={{
                    myCustomButton: {
                        text: moment(changeDate).format('YYYY.MM'),
                        click: () => {
                            setPickerShow(true)
                            return <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#datePicker" aria-controls="datePicker" />
                        }
                    },
                    prev: {
                        icon: "fa-chevron-left",
                        click: () => {
                            calendar.prev()
                            let date = moment(calendar.getDate()).format('YYYY-MM-DD')
                            setChangeDate(date)
                        }
                    },
                    next: {
                        icon: "fa-chevron-right",
                        click: () => {
                            calendar.next()
                            let date = moment(calendar.getDate()).format('YYYY-MM-DD')
                            setChangeDate(date)
                        }
                    }
                }}
                dateClick={({ dateStr }) => {
                    setDateShow({ ...dateShow, date: dateStr, show: true })
                    return <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#scheduleModal"></button>
                }}
                timeZone="local"
                events={scheduleList}
                eventLimit={3}
                moreLinkContent={arg => arg.shortText}
                moreLinkClick={info => {
                    setDateShow({ ...dateShow, date: moment(info.date).format('YYYY-MM-DD'), show: true })
                    return <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#scheduleModal"></button>
                }}
                themeSystem='bootstrap'
                height='78vh'
            />
            <DatePickerModal initialDate={initialDate} changeDate={changeDate} setChangeDate={setChangeDate} show={pickerShow} setShow={setPickerShow} />
            <ScheduleModal dateShow={dateShow} setDateShow={setDateShow} />
        </>
    )
}

export default AdminMonthly