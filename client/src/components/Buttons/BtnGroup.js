import { useHistory } from "react-router-dom";
import styles from "./buttons.module.scss";

const BtnGroup = ({ text, disabled, handleSubmit }) => {
    const history = useHistory();

    return (
        <div className="d-flex justify-content-around my-4">
            <button className="btn btn-white col-5 shadow-none border-dark" type="button" onClick={() => history.goBack()}>취소</button>
            <button className={`btn btn-crimson col-5 ${styles.disabledBtn}`} type="button" onClick={handleSubmit} disabled={disabled}>{text ? "수정" : "등록"}</button>
        </div>
    )
}

export default BtnGroup