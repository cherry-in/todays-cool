import PlanItem from "./PlanItem";
import styles from "./studyplan.module.scss";

const AddplanList = ({ planList, getPlanList }) => {
    
    return (
        <div className={`mt-4 ${styles.list}`}>
            <div className={`accordion accordion-flush`} id="addplanlist">
                <PlanItem planList={planList.planList} subjectId={planList.id} getPlanList={getPlanList} />
            </div>
        </div>
    )
}

export default AddplanList