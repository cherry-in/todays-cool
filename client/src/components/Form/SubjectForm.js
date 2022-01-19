import { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useAuth } from '../../utils/context';
import BtnGroup from "../Buttons/BtnGroup";
import subjectApi from '../../apis/subject.api';
import catchErrors from '../../utils/catchErrors';
import styles from "./form.module.scss";

const SubjectForm = () => {
  const { user } = useAuth();
  const { subjectId } = useParams();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [subject, setSubject] = useState({
    lectureName: "",
    prof: "",
    classRoom: ""
  });

  useEffect(() => {
    if (subjectId) getInfo(subjectId);
  }, [])

  useEffect(() => {
    let isMounted = true;
    const checkInfo = { lectureName: subject.lectureName }

    if (isMounted) {
      const isSubject = Object.values(checkInfo).every((el) => Boolean(el));
      isSubject ? setDisabled(false) : setDisabled(true);
    }
    return () => {
      isMounted = false;
    }
  }, [subject])

  function handleChange(e) {
    const { name, value } = e.target
    setSubject({ ...subject, [name]: value })
  }

  async function getInfo(subjectId) {
    try {
      setError("")
      const result = await subjectApi.getSubInfo(user.id, subjectId)
      setSubject({ ...subject, ...result })
    } catch (error) {
      catchErrors(error, setError)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("")
      if (subjectId) {
        //수정함수 실행
        await subjectApi.editSubject(subject, user.id, subjectId)
        alert("해당 과목 정보가 성공적으로 수정되었습니다.")
      } else {
        //등록함수 실행
        await subjectApi.addSubject(subject, user.id)
        alert("해당 과목 정보가 성공적으로 등록되었습니다.")
      }
      setSuccess(true)
    } catch (error) {
      catchErrors(error, setError)
      setSubject({
        lectureName: "",
        prof: "",
        classRoom: ""
      })
    }
  }

  if (success) {
    return <Redirect to="/studyplan" />
  }

  return (
    <div className="position-absolute top-50 start-50 translate-middle" style={{ width: "80%" }}>
      <div>
        <div className="mb-5 d-flex flex-row">
          <label className="form-label fs-4" style={{ width: "100px" }}>강의명</label>
          <input className={`form-control shadow-none rounded-0 ${styles.textInput}`} value={subject.lectureName} name="lectureName" onChange={handleChange} autoComplete="off" />
        </div>
        <div className="mb-5 pt-2 d-flex flex-row">
          <label className="form-label fs-4" style={{ width: "100px" }}>교수명</label>
          <input className={`form-control shadow-none rounded-0 ${styles.textInput}`} value={subject.prof} name="prof" onChange={handleChange} autoComplete="off" />
        </div>
        <div className="mb-5 pt-2 d-flex flex-row">
          <label className="form-label fs-4 " style={{ width: "100px", letterSpacing: "15px" }}>장소</label>
          <input className={`form-control shadow-none rounded-0 ${styles.textInput}`} value={subject.classRoom} name="classRoom" onChange={handleChange} autoComplete="off" />
        </div>
      </div>
      <div className="pt-2">
        <BtnGroup text={subjectId} disabled={disabled} handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default SubjectForm;