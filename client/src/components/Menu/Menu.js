import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import todoApi from "../../apis/todo.api";
import { useAuth } from "../../utils/context.js";
import catchErrors from "../../utils/catchErrors";
import moment from "moment";
import styles from "./menu.module.scss";

const Menu = () => {
    const { user, logout } = useAuth();
    const [todoList, setTodoList] = useState({ percent: 0, list: [] })
    const [error, setError] = useState("");

    useEffect(() => {
        todayTodo()
    }, [])

    async function todayTodo() {
        try {
            setError("")
            const result = await todoApi.getTodopercent(user.id, moment().format("YYYY-MM-DD"))
            setTodoList({ ...todoList, ...result })
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function checkFn(e, todoId) {
        try {
            setError("")
            const check_v = e.target.value === "true" ? true : false
            await todoApi.edit({id: todoId, done: check_v}, user.id)
            todayTodo()
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <>
            <button className="btn btn-crimson shadow-none mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#menuContent" aria-controls="menuContent" aria-expanded="false" aria-label="menu">
                <i className="bi bi-list fs-4"></i>
            </button>
            <div className={`collapse collapse-horizontal position-absolute top-0 start-0 h-100 ${styles.content}`} id="menuContent">
                <div className="d-flex flex-column" style={{ transition: ".15s ease", height: "inherit" }}>
                    <button type="button" className={`btn-close btn-close-white btn-lg position-absolute ${styles.close}`} data-bs-toggle="collapse" data-bs-target="#menuContent" aria-controls="menuContent" aria-expanded="true" aria-label="menu"></button>
                    <div className="d-flex flex-column align-items-center text-white py-5" style={{ backgroundColor: "crimson" }}>
                        <h1 className="my-3">{user.name} 님</h1>
                        <h2 className="my-2">오늘의 목표 {todoList.percent}% 달성!</h2>
                    </div>
                    <div className="d-flex flex-column justify-content-between flex-grow-1 py-4 ps-3 text-dark" >
                        <div className="user-select-none w-75 ps-3">
                            <h2 className="mb-4">To-do</h2>
                            {todoList.list.length !== 0 ? todoList.list.map((todo, idx) => <div className="d-flex">
                                <p className={`form-check-label border-bottom border-2 text-nowrap fs-5 pb-1 me-3 ${styles.title}`}>{todo.title}</p>
                                <input className={`form-check-input rounded-0 border-dark shadow-none mt-1 ${styles.checkBox}`} type="checkbox" id={"todoCheck" + idx} value={todo.done} aria-label="checkbox" onClick={(e) => checkFn(e, todo.id)} checked={todo.done} />
                            </div>) : <div className="text-center border-bottom border-2 pb-1">오늘의 Todo를 등록해 보세요!</div>}
                            <Link className="d-flex justify-content-center text-dark text-decoration-none mt-2" to={`/todo/${moment().format("YYYY-MM-DD")}`}>
                                <i className="bi bi-plus-lg me-2"></i>
                                <p className="mb-0">더보기</p>
                            </Link>
                        </div>
                        <div className="d-flex flex-column">
                            <Link className="text-dark text-decoration-none" to={`/schedule/${moment().format("YYYY-MM-DD")}`}><i className="bi bi-check"></i>일정</Link>
                            <Link className="text-dark text-decoration-none" to="/studyplan"><i className="bi bi-check"></i>학업별 계획</Link>
                        </div>
                        <p className={`position-absolute bottom-0 text-dark ${styles.logout}`} onClick={logout}>로그아웃</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu