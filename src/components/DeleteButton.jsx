const DeleteButton = ({ id, onDelete }) => (
  <button
    className="note-item__delete-button"
    onClick={() => onDelete(id)}
  >
    Delete
  </button>
);

export default DeleteButton;
