import NoteItem from './NoteItem';

const NoteList = ({ notes, onDelete, onToggle }) => (
  <div className="notes-list">
    {notes.length !== 0 ?  (
      notes.map((note) => (
        <NoteItem
          key={note.id}
          id={note.id}
          onDelete={onDelete}
          onToggle={onToggle}
          archived={note.archived}
          {...note}
        />
      ))
    ) : (
      <div className="empty-message-container">
        <p>Tidak ada catatan</p>
      </div>
    )}
  </div>
);

export default NoteList;
