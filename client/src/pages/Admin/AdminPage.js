import Monthly from "../../components/Calendar/AdminMonthly";
import Footer from "../../components/Footer";
import { useAuth } from "../../utils/context";
import styles from "./admin.module.scss";

const AdminPage = () => {
    const { logout } = useAuth()

    return (
        <>
            <p className={`position-absolute user-select-none ${styles.status}`}>관리자님, 환영합니다. | <span className={styles.cursor} onClick={logout}>로그아웃</span></p>
            <div className={styles.body}>
                <Monthly />
            </div>
            <Footer pathname="admin/edit" />
        </>
    )
}

export default AdminPage