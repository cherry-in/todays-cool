import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Menu from "../components/Menu/Menu";
import BackBtn from "../components/Buttons/BackBtn";
import AddplanList from "../components/StudyPlan/AddplanList";
import Footer from "../components/Footer";
import subjectApi from "../apis/subject.api";
import catchErrors from "../utils/catchErrors";
import { useAuth } from "../utils/context";

const StudyPlanPage = () => {
    const { user } = useAuth()
    const [planList, setPlanList] = useState({})
    const [error, setError] = useState("");
    const { subjectId } = useParams();

    useEffect(() => {
        getPlanList()
    }, [])

    async function getPlanList() {
        try {
            setError("")
            const res = await subjectApi.allSubject(user.id, subjectId)
            setPlanList(res[0])
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <>
            <Menu />
            <BackBtn />
            <h2 className="text-center">{planList.name}</h2>
            <AddplanList planList={planList} getPlanList={getPlanList} />
            <Footer pathname={`studyplan/submit/${subjectId}`} />
        </>
    )
}

export default StudyPlanPage