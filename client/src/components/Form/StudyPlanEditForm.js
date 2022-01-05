import { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useAuth } from "../../utils/context";
import BtnGroup from "../Buttons/BtnGroup";
import subjectApi from '../../apis/subject.api';
import planApi from '../../apis/plan.api';
import catchErrors from '../../utils/catchErrors';
import styles from "./form.module.scss";

const StudyPlanEditForm = () => {
    const { user } = useAuth();
    const params = useParams();
    const [disabled, setDisabled] = useState(true)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false)
    const [studyplan, setStudyplan] = useState({
        studyplanTitle: "",
        endDate: "",
        memo: "",
        deadline: "",
        selected: ""
    })
    const [subjectList, setList] = useState([])

    useEffect(() => {
        let isMounted = true;
        const checkInfo = { studyplanTitle: studyplan.studyplanTitle, endDate: studyplan.endDate, selected: studyplan.selected }
        if (studyplan.deadline === "on") {
            checkInfo.endTime = studyplan.endTime
        } else {
            delete checkInfo.endTime
        }
        if (isMounted) {
            const isStudyPlan = Object.values(checkInfo).every((el) => Boolean(el));
            isStudyPlan ? setDisabled(false) : setDisabled(true);
        }
        return () => {
            isMounted = false;
        }
    }, [studyplan])

    useEffect(() => {
        getSubject(user.id)
        if (params.subjectId) setStudyplan({...studyplan, selected: params.subjectId })
        else if (params.planId) getInfo(params.planId);
    }, [])

    async function getSubject(id) {
        try {
            setError("")
            const result = await subjectApi.subjectTitle(id)
            setList(result)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function getInfo(planId) {
        try {
            setError("")
            const result = await planApi.getDetail(planId)
            setStudyplan({ ...studyplan, ...result })
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    function handleChange(e) {
        const { name, value } = e.target
        if (name === "deadline") {
            studyplan.deadline !== "on" ? setStudyplan({ ...studyplan, [name]: value }) : setStudyplan({ ...studyplan, [name]: "off" })
        } else {
            setStudyplan({ ...studyplan, [name]: value })
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError("")
            if (params.subjectId) {
                //등록함수 실행
                await planApi.submit(studyplan, params.subjectId)
                alert("해당 학업계획이 성공적으로 등록되었습니다.")
            } else {
                //수정함수 실행
                await planApi.edit(studyplan, params.planId)
                alert("해당 학업계획이 성공적으로 수정되었습니다.")
            }
            setSuccess(true)
        } catch (error) {
            catchErrors(error, setError)
            setStudyplan({
                studyplanTitle: "",
                endDate: "",
                deadline: "",
                memo: "",
                selected: ""
            })
        }
    }

    if (success) {
        return <Redirect to="/studyplan" />
    }

    return (
        <div className="pt-5">
            <select className={`form-select mb-4 ${styles.selectInput}`} name="selected" aria-label="Choose subject" onChange={handleChange}>
                {subjectList.length !== 0 ? subjectList.map((subject, idx) => {
                    if (idx === 0) return <>
                        <option selected={studyplan.selected === "" ? true : false}>관련 과목을 선택해주세요.</option>
                        <option value={subject.id} selected={studyplan.selected === subject.id ? true : false}>{subject.name}</option>
                    </>
                    else return <option value={subject.id} selected={studyplan.selected === subject.id ? true : false}>{subject.name}</option>
                })
                : <option selected>새로운 과목을 만들어주세요.</option>}
            </select>
            <input type="text" name="studyplanTitle"
                className={`form-control shadow-none rounded-0 mb-5 ${styles.textInput}`}
                placeholder="제목" value={studyplan.studyplanTitle} onChange={handleChange} autoComplete="off" />
            <div className="d-flex mb-3">
                <label className="col col-form-label align-self-center py-0">마감일</label>
                <div className={studyplan.deadline === "on" ? "col-5" : "col-7"}>
                    <input className={`form-control shadow-none ${styles.dateInput}`} type="date" name="endDate" aria-label="endDate" value={studyplan.endDate} onChange={handleChange} />
                </div>
                <div className={"col-4 " + (studyplan.deadline === "on" ? "d-block" : "d-none")}>
                    <input className={`form-control shadow-none ${styles.dateInput}`} type="time" name="endTime" aria-label="endTime" value={studyplan.endTime} onChange={handleChange} />
                </div>
            </div>
            <div className="d-flex justify-content-end form-check mb-4">
                <input className={`form-check-input shadow-none ${styles.checkBox} me-2`} type="checkbox" id="deadline" name="deadline" onChange={handleChange} checked={studyplan.deadline === "on" ? true : false} />
                <label className="form-check-label" htmlFor="deadline">시간 </label>
            </div>
            <div className="d-flex justify-content-between mb-5">
                <i className="col bi bi-journal-text fs-3"></i>
                <div className="col-10">
                    <textarea className={`form-control shadow-none ${styles.textArea}`} name="memo" rows="5" value={studyplan.memo} onChange={handleChange}></textarea>
                </div>
            </div>
            <BtnGroup disabled={disabled} handleSubmit={handleSubmit} />
        </div>
    )
}

export default StudyPlanEditForm