import { useState, useEffect } from "react";
import moment from 'moment';
import styles from "./modal.module.scss";

const DatePickerModal = ({ initialDate, changeDate, setChangeDate, show, setShow }) => {
    const [date, setDate] = useState({ year: moment(changeDate).get('year'), month: moment(changeDate).get('month') + 1 })
    const [year, setYear] = useState({ start: moment(initialDate).get('year') - 3, end: moment(initialDate).get('year') + 3 })
    const month = moment(initialDate).get('month') + 1

    useEffect(() => {
        setDate({ year: moment(changeDate).get('year'), month: moment(changeDate).get('month') + 1 })
    }, [changeDate])

    function up(e) {
        const { id } = e.target
        if (id === "year") {
            if (date[id] < year.end) setDate({ ...date, [id]: date[id] + 1 })
        } else {
            if (date[id] === 12) setDate({ ...date, [id]: 1 })
            else setDate({ ...date, [id]: date[id] + 1 })
        }
    }

    function down(e) {
        const { id } = e.target
        if (id === "year") {
            if (date[id] > year.start) setDate({ ...date, [id]: date[id] - 1 })
        } else {
            if (date[id] === 1) setDate({ ...date, [id]: 12 })
            else setDate({ ...date, [id]: date[id] - 1 })
        }
    }

    function cancel() {
        setDate({ year: moment(changeDate).get('year'), month: moment(changeDate).get('month') + 1 })
        setShow(false)
    }

    function handleClick() {
        if (date.year === year.start) {
            if (month > date.month) alert("선택하신 날짜는 유효하지 않습니다. 다시 선택해주세요.")
            else {
                let dateStr = date.year + "-" + date.month + "-01"
                setChangeDate(moment(dateStr).format("YYYY-MM-DD"))
                setShow(false)
            }
        } else if (date.year === year.end) {
            if (month < date.month) alert("선택하신 날짜는 유효하지 않습니다. 다시 선택해주세요.")
            else {
                let dateStr = date.year + "-" + date.month + "-01"
                setChangeDate(moment(dateStr).format("YYYY-MM-DD"))
                setShow(false)
            }
        } else {
            let dateStr = date.year + "-" + date.month + "-01"
            setChangeDate(moment(dateStr).format("YYYY-MM-DD"))
            setShow(false)
        }
    }

    return (
        <>
            {show ? <div className="offcanvas-backdrop fade show"></div> : null}
            <div className={"offcanvas offcanvas-bottom " + (show ? "visible show" : "invisiblel")} tabIndex="-1" id="datePicker" aria-labelledby="datePicker">
                <div className="offcanvas-body small user-select-none py-2">
                    <div className="d-flex my-3">
                        <div className="col-6 d-flex flex-column justify-content-between align-items-center fs-4">
                            <i className={`bi bi-caret-up-fill ${styles.cursor}`} id="year" onClick={up}></i>
                            {date.year}
                            <i className={`bi bi-caret-down-fill ${styles.cursor}`} id="year" onClick={down}></i>
                        </div>
                        <div className="col-6 d-flex flex-column justify-content-between align-items-center fs-4">
                            <i className={`bi bi-caret-up-fill ${styles.cursor}`} id="month" onClick={up}></i>
                            {date.month < 10 ? "0" + date.month : date.month}
                            <i className={`bi bi-caret-down-fill ${styles.cursor}`} id="month" onClick={down}></i>
                        </div>
                    </div>
                    <div className={`d-flex pt-2 border-top border-dark ${styles.cursor}`}>
                        <div className="col-6" data-bs-dismiss="offcanvas">
                            <p className="text-center fs-6 py-1 mb-0" onClick={cancel}>취소</p>
                        </div>
                        <div className="col-6" data-bs-dismiss="offcanvas" onClick={handleClick}>
                            <p className="text-center fs-6 py-1 mb-0">완료</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DatePickerModal