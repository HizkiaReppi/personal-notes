import NoteItemBody from './NoteItemBody';
import DeleteButton from './DeleteButton';
import UpdateButton from './UpdateButton';

const NoteItem = ({
  id,
  title,
  body,
  createdAt,
  onDelete,
  onToggle,
  archived,
}) => (
  <div className="note-item">
    <NoteItemBody
      title={title}
      createdAt={createdAt}
      body={body}
    />
    <div className="note-item__action ">
      <DeleteButton
        id={id}
        onDelete={onDelete}
      />
      <UpdateButton
        id={id}
        onToggle={onToggle}
      >
        {archived ? 'Pindahkan' : 'Arsipkan'}{' '}
      </UpdateButton>
    </div>
  </div>
);

export default NoteItem;
