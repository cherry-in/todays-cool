const TodoPostModal = ({ handleClick }) => {
  return (
    <div className="modal fade" id="postmodal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <p className="m-2 text-center" style={{ fontSize: "17px" }}>해당 일정을 내일로 미루시겠습니까?</p>
          </div>
          <div className="modal-footer p-1">
            <button type="button" className="btn btn-crimson btn-sm" data-bs-dismiss="modal" onClick={handleClick}>네</button>
            <button type="button" className="btn btn-secondary btn-sm"
              data-bs-dismiss="modal">아니요</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoPostModal;