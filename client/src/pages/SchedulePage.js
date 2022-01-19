import Menu from "../components/Menu/Menu";
import HomeBtn from "../components/Buttons/HomeBtn";
import DateView from "../components/Calendar/DateView";
import Footer from "../components/Footer";

const SchedulePage = () => {
    return (
        <>
            <Menu />
            <HomeBtn />
            <DateView />
            <Footer pathname="schedule/edit" />
        </>
    )
}

export default SchedulePage