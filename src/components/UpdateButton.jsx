const UpdateButton = ({ id, onToggle, children }) => (
  <button
    className="note-item__archive-button"
    onClick={() => onToggle(id)}
  >
    {children}
  </button>
);

export default UpdateButton;
