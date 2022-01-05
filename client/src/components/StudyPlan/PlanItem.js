import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import planApi from "../../apis/plan.api";
import { useAuth } from "../../utils/context";
import catchErrors from "../../utils/catchErrors";
import styles from "../Schedule/schedule.module.scss";
import styles2 from "./studyplan.module.scss";
import moment from 'moment';

const PlanItem = ({ planList = [], subjectId, getPlanList }) => {
  const { user } = useAuth()
  const [error, setError] = useState("")
  const history = useHistory()

  async function delPlan(planId) {
    try {
      setError("")
      await planApi.remove(planId, user.id)
      alert("해당 계획을 성공적으로 삭제했습니다.")
      history.push("/studyplan")
    } catch (error) {
      catchErrors(error, setError)
    }
  }
  async function checkFn(e, planId, planCk) {
    try {
      setError("")
      e.preventDefault();
      const result = await planApi.saveCheck(planId, planCk)
      console.log('check save result', result)
      if (result === "success") {
        getPlanList()
      }
    } catch (error) {
      catchErrors(error, setError)
    }
  }


  return (
    <>
      {planList.length !== 0 ? planList.map((plan, idx) => <div className="d-flex">
        <input className={`form-check-input rounded-0 shadow-none mt-1 ${styles2.checkBox}`} style={{ width: "5%" }} type="checkbox" checked={plan.checked} onClick={(e) => checkFn(e, plan.id, plan.checked)} />
        <div className="accordion-item border-0 col" style={{ width: "95%" }}>
          <button className={`d-flex flex-column align-items-start accordion-button collapsed bg-white shadow-none px-0 pt-0 ps-3 ${styles.activeBtn}`} type="button" data-bs-toggle="collapse" data-bs-target={"#plan" + idx} aria-expanded="false" aria-controls={"plan" + idx}>
            <h5 className={`accordion-header ${styles.title}`} id={"plan-heading" + idx}>{plan.title}</h5>
            <p className={`text-secondary mb-0 ${styles.time}`}>
              ~ {plan.timeChecked ? moment(plan.deadline).format("YY.MM.DD HH:mm") : moment(plan.deadline).format("YY.MM.DD")}
            </p>
          </button>
          <div id={"plan" + idx} className="accordion-collapse collapse" aria-labelledby={"plan-heading" + idx} data-bs-parent="S#addplanlist">
            <div className={`accordion-body px-0 pt-2 pb-0 mb-3 ${styles.textBox}`}>
              <div className="d-flex align-items-start fw-bold">
                <i className="bi bi-clock-history fs-5"></i>
                <div className="col-11 ms-2 align-self-center">
                  ~ {plan.timeChecked ? moment(plan.deadline).format("YY.MM.DD HH:mm") : moment(plan.deadline).format("YY.MM.DD")}
                </div>
              </div>
              {plan.memo}
              <div className="d-flex justify-content-end mt-3">
                <Link className="btn btn-light btn-sm border-dark" to={`/studyplan/edit/${plan.id}`}>수정</Link>
                <button type="button" className="btn btn-crimson btn-sm ms-2" onClick={() => delPlan(plan.id)}>삭제</button>
              </div>
            </div>
          </div>
        </div>
      </div>)
        : <p className="text-center">등록된 학업 계획이 없습니다. </p>}
    </>
  )
}

export default PlanItem;