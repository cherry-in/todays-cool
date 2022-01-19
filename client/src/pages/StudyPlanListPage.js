import Menu from "../components/Menu/Menu";
import HomeBtn from "../components/Buttons/HomeBtn";
import StudyPlanList from "../components/StudyPlan/StudyPlanList";

const StudyPlanListPage = () => {
    return (
        <>
            <Menu />
            <HomeBtn />
            <h2 className="text-center">학업별 계획</h2>
            <StudyPlanList />
        </>
    )
}

export default StudyPlanListPage