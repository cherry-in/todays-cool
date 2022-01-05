import { Link } from "react-router-dom";
import PlanLineList from "./PlanLineList";
import DeleteModal from "../Modal/DeleteModal";
import style from "./studyplan.module.scss";

const StudyPlanCard = ({ renList, handleEdit, delSubject }) => {

  return (
    <>
      <Link className="card text-decoration-none link-dark mb-3" to={`/studyplan/${renList.id}`} style={{ width: "20rem" }} >
        <div className="card-body" style={{ height: "150px" }}>
          <div className="d-flex">
            <h5 className="card-title col-10 text-nowrap" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{renList.name}</h5>
            <div className="col-2 d-flex justify-content-end">
              <Link className="text-decoration-none link-dark" to={`/subject/edit/${renList.id}`}><i className="bi bi-pencil-square pe-2"></i></Link>
              <i className="bi bi-trash" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={(e) => e.preventDefault()}>
              </i>
            </div>
          </div>
          <p className="card-subtitle ms-1 mb-0 text-muted">{renList.prof && renList.room ? renList.prof + ' - ' + renList.room : (renList.prof || renList.room)}</p>
          <div className={`mt-2 ${style.inCard}`} style={{ height: (renList.prof || renList.room ? "50%" : "70%") }}>
            <PlanLineList subjectId={renList.id} planList={renList.planList} handleClick={handleEdit} />
          </div>
        </div>
      </Link>
      <DeleteModal handleClick={delSubject} renListID={renList.id} />
    </>
  )
}

export default StudyPlanCard;