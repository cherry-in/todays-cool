import { useState, useEffect } from "react";
import todoApi from "../../apis/todo.api";
import { useAuth } from "../../utils/context";
import catchErrors from "../../utils/catchErrors";
import moment from "moment";
import styles from "./modal.module.scss";

const TodoModal = ({ curDate, selectTodo, clicked, setClicked }) => {
  const { user } = useAuth()
  const [todo, setTodo] = useState({
    todoTitle: "",
    todoDate: moment(curDate).format("YYYY-MM-DD")
  })
  const [error, setError] = useState("")

  useEffect(() => {
    if (clicked) setTodo({ ...todo, ...selectTodo })
  }, [clicked])

  useEffect(() => {
    setTodo({ ...todo, todoDate: curDate })
  }, [curDate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setTodo({ ...todo, [name]: value })
  }

  function handleClick() {
    setTodo({ todoTitle: "", todoDate: "" })
    setClicked(false)
  }

  async function handleSubmit() {
    try {
      setError("")
      if (selectTodo) {
        await todoApi.edit(todo, user.id)
        alert("해당 할일이 성공적으로 수정되었습니다.")
      } else {
        await todoApi.submit(todo, user.id)
        alert("해당 할일이 성공적으로 등록되었습니다.")
      }
      setClicked(false)
      window.location.reload()
    } catch (error) {
      catchErrors(error, setError)
    }
  }

  return (
    <div className="modal fade" id="todomodal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="todoLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ backgroundColor: "crimson" }}>
          <div className="modal-header px-2 py-1" >
            <h5 className="modal-title text-white" id="todoLabel">To-do</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body bg-white">
            <input type="text" name="todoTitle"
              className={`form-control border-top-0 border-end-0 border-start-0 shadow-none rounded-0 ${styles.textInput}`}
              placeholder="제목" onChange={handleChange} value={todo.todoTitle} autoComplete="off" />
            <div className="d-flex justify-content-between mt-4">
              <label className="col-2 col-form-label ms-2">날짜</label>
              <div className="col-8 d-flex align-items-center">
                <input type="date" className={`form-control form-control-sm shadow-none ${styles.dateInput}`} name="todoDate" onChange={handleChange} value={todo.todoDate} />
              </div>
            </div>
          </div>
          <div className="modal-footer bg-white p-1" >
            <button type="button" className="btn btn-secondary btn-sm"
              data-bs-dismiss="modal" onClick={handleClick}>취소</button>
            <button type="button" className="btn btn-crimson btn-sm" onClick={handleSubmit}>{selectTodo ? "수정" : "확인"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoModal;
