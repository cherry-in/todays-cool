import { Link } from "react-router-dom";
import styles from "./studyplan.module.scss";

const PlanLineList = ({ subjectId, planList = [], handleClick }) => {
  return (
    <>
      {planList.length !== 0 ? planList.map(plan => <div className="d-flex justify-content-between">
        <Link to={`/studyplan/${subjectId}`} className={`col-11 card-text text-decoration-none link-dark mb-1 ${styles.text}`}>- {plan.title}</Link>
        <div className="col d-flex justify-content-end">
          <input className={`form-check-input shadow-none ${styles.checkBox}`} type="checkbox" checked={plan.checked} onClick={(e) => handleClick(e, plan.id, plan.checked)} />
        </div>
      </div>) : <Link className="d-flex text-decoration-none link-dark" to={`/studyplan/submit/${subjectId}`}>
        <i className="bi bi-plus"></i>
        <p className="card-text mb-1">새로운 계획 추가하기</p>
      </Link>}
    </>
  )
}

export default PlanLineList