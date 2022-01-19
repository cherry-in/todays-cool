import Menu from "../components/Menu/Menu";
import HomeBtn from "../components/Buttons/HomeBtn";
import Weekly from "../components/Calendar/Weekly";
import TodoList from "../components/TodoList";
import Footer from "../components/Footer";

const ToDoPage = () => {
    return (
        <div>
            <Menu />
            <HomeBtn />
            <h1 className="text-center">To-do</h1>
            <Weekly />
            <TodoList />
            <Footer />
        </div>
    )
}

export default ToDoPage