import { useHistory } from "react-router-dom";
import styles from "./buttons.module.scss";

const BackBtn = () => {
    const history = useHistory();

    return (
        <button className={`btn btn-outline-crimson position-absolute border-0 shadow-none p-0 ${styles.backBtn}`} onClick={() => history.goBack()}>
            <i className={`bi bi-arrow-left-square ${styles.icon}`}></i>
        </button>
    )
}

export default BackBtn