import { Link } from "react-router-dom";
import styles from "./buttons.module.scss";

const HomeBtn = () => {
    return (
        <Link className={`btn btn-outline-crimson position-absolute ${styles.homeBtn}`} to="/home">
            <i className={`bi bi-house-door-fill fs-4 ${styles.icon}`}></i>
        </Link>
    )
}

export default HomeBtn