import { Link } from "react-router-dom";
import styles from "./buttons.module.scss";

const EditBtn = ({ pathname }) => {
    return (
        <Link className="me-2 mb-1" to={"/" + pathname}>
            <i className={`bi bi-plus-circle ${styles.icon}`}></i>
        </Link>
    )
}

export default EditBtn