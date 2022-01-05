import Menu from "../components/Menu/Menu";
import Monthly from "../components/Calendar/Monthly";
import Footer from "../components/Footer";

const HomePage = () => {
    return (
        <>
            <Menu />
            <Monthly />
            <Footer pathname="schedule/edit" />
        </>
    )
}

export default HomePage