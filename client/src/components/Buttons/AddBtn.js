import { useParams } from "react-router-dom";
import TodoModal from "../Modal/TodoModal";
import styles from "./buttons.module.scss";

const AddBtn = () => {
    const { date } = useParams()

    return (
        <>
            <i className={`bi bi-plus-circle me-2 mb-1 ${styles.icon}`} data-bs-toggle="modal" data-bs-target="#todomodal"></i>
            <TodoModal curDate={date} />
        </>
    )
}

export default AddBtn