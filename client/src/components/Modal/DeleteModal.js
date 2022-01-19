const DeleteModal = ({ handleClick, renListID }) => {
  return (
    <div className="modal fade" id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body text-center">
            <p>관련 학업계획까지 삭제됩니다.</p>
            <p>정말 삭제하시겠습니까?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">취소</button>
            <button type="button" className="btn btn-crimson btn-sm" data-bs-dismiss="modal" onClick={(e) => handleClick(e, renListID)}>삭제</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal;
