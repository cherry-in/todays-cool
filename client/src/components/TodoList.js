import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TodoModal from "../components/Modal/TodoModal";
import TodoPostModal from "../components/Modal/TodoPostModal";
import todoApi from "../apis/todo.api";
import { useAuth } from "../utils/context";
import catchErrors from "../utils/catchErrors";
import moment from "moment";
import styles from "../components/Form/form.module.scss";

const TodoList = () => {
  const { user } = useAuth()
  const { date } = useParams()
  const [todoList, setTodoList] = useState([])
  const [selectTodo, setSelectTodo] = useState(null)
  const [clicked, setClicked] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    getAll()
  }, [date])

  async function getAll() {
    try {
      setError("")
      const resList = await todoApi.getTodo(user.id, date)
      setTodoList(resList)
    } catch (error) {
      catchErrors(error, setError)
    }
  }

  async function checkFn(e, todoId) {
    try {
      setError("")
      const check_v = e.target.value === "true" ? true : false
      await todoApi.edit({ id: todoId, done: check_v }, user.id)
      alert("해당 변경사항이 정상적으로 저장되었습니다.")
      window.location.reload()
      // getAll()
      // getTodoList()
    } catch (error) {
      catchErrors(error, setError)
    }
  }

  async function delayTodo() {
    try {
      setError("")
      const nextDate = moment(date).add(1, 'day').format("YYYY-MM-DD")
      await todoApi.edit({ id: selectTodo.id, todoDate: nextDate }, user.id)
      window.location.reload()
    } catch (error) {
      catchErrors(error, setError)
    }
  }

  async function delTodo(todoId) {
    try {
      setError("")
      await todoApi.remove(todoId, user.id)
      alert("해당 할일이 성공적으로 삭제되었습니다.")
      window.location.reload()
    } catch (error) {
      catchErrors(error, setError)
    }
  }

  return (
    <div className={`mt-3 ${styles.list}`}>
      <div className={todoList.length ? "d-flex flex-column" : "d-block"}>
        {todoList.length !== 0 ?
          todoList.map((todo, idx) => <div key={idx} className="d-flex mb-1">
            <div className="d-flex align-items-center" style={{ width: "75%" }}>
              <div className="col d-flex align-items-center">
                <input className={`form-check-input rounded-0 shadow-none mt-0 ${styles.checkBox}`} type="checkbox" id={"todoCheck" + idx} value={todo.done} checked={todo.done} onClick={(e) => checkFn(e, todo.id)} />
              </div>
              <label className="col-11 form-check-label fs-5 pe-1 text-nowrap" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{todo.todoTitle}</label>
            </div>
            <div className="d-flex justify-content-between" style={{ cursor: "pointer", width: "25%" }}>
              <i className="bi bi-arrow-right fs-5" data-bs-toggle="modal" data-bs-target="#postmodal" onClick={() => setSelectTodo(todo)}></i>
              <i className="bi bi-pencil-square fs-5" data-bs-toggle="modal" data-bs-target="#todomodal" onClick={() => { setSelectTodo(todo); setClicked(true) }}></i>
              <i className="bi bi-trash fs-5" onClick={() => delTodo(todo.id)}></i>
            </div>
          </div>) : <p className="text-center">등록된 할일이 없습니다.</p>}
        <TodoPostModal handleClick={delayTodo} />
        <TodoModal curDate={date} selectTodo={selectTodo} clicked={clicked} setClicked={setClicked} />
      </div>
    </div>
  )
}

export default TodoList;