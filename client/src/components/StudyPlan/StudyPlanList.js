import { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import StudyPlanCard from "./StudyPlanCard";
import subjectApi from '../../apis/subject.api';
import planApi from '../../apis/plan.api';
import catchErrors from "../../utils/catchErrors";
import { useAuth } from "../../utils/context";
import styles from "./studyplan.module.scss";

const StudyPlanList = () => {
  const { user } = useAuth();
  const [renList, setRenList] = useState([])
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const history = useHistory()

  useEffect(() => {
    getList(user.id);
  }, [])

  async function getList(userId) {
    try {
      setError("")
      const result = await subjectApi.allSubject(userId)
      setRenList(result)
    } catch (error) {
      catchErrors(error, setError)
    }
  }

  async function checkFn(e, planId, planCk) {
    try {
      setError("")
      e.preventDefault();
      const result = await planApi.saveCheck(planId, planCk)
      if (result === "success") {
        getList(user.id)
      }
    } catch (error) {
      catchErrors(error, setError)
    }
  }

  async function delSubject(e, subjectId) {
    e.preventDefault()
    try {
      setError("")
      await subjectApi.removeSubject(subjectId, user.id)
      alert("해당 과목 정보가 성공적으로 삭제되었습니다.")
      setSuccess(true)
    } catch (error) {
      catchErrors(error, setError)
    }
  }

  if (success) history.push("/home")

  return (
    <div className={`mt-4 ${styles.list}`}>
      <div className="d-flex flex-column align-items-center">
        {renList.length !== 0 ? renList.map((info, idx) => <StudyPlanCard key={idx} renList={info} handleEdit={checkFn} delSubject={delSubject} />) : null}
        <Link className="card text-decoration-none link-dark" to="/subject/edit" style={{ width: "20rem" }}>
          <div className="card-body d-flex flex-column bg-secondary bg-opacity-25">
            <i className="bi bi-plus-lg d-flex justify-content-center fs-3"></i>
            <p className="card-text mt-2 text-center">새로운 과목 추가하기</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default StudyPlanList;