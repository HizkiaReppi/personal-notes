import React from 'react';
import autoBind from 'react-autobind';
import Swal from 'sweetalert2';

import { getInitialData } from './utils/index';
import { NoteList, NoteInput, Navbar } from './components';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      searchNotes: '',
    };

    autoBind(this);
  }

  showAlert(icon, title, text) {
    Swal.fire({
      icon,
      title,
      text,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  addNotesHandler({ title, body }) {
    this.setState((prevState) => {
      const newNotes = {
        id: +new Date(),
        title,
        body,
        archived: false,
        createdAt: new Date().toISOString(),
      };

      const updatedNotes = [...prevState.notes, newNotes];

      this.showAlert('success', 'Sukses!', 'Catatan Anda Berhasil Ditambahkan.');

      return {
        notes: updatedNotes,
      };
    });
  }

  deleteNotesHandler(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Anda tidak akan dapat memulihkan catatan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.setState((prevState) => ({
          notes: prevState.notes.filter((note) => note.id !== id),
        }));

        this.showAlert('success', 'Terhapus!', 'Catatan Anda Berhasil Dihapus.');
      }
    });
  }

  toggleArchiveStatus(id) {
    this.setState((prevState) => {
      const updatedNotes = prevState.notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note,
      );

      const isArchived = updatedNotes.find(
        (note) => note.id === id,
      )?.archived;

      this.showAlert(
        'success',
        'Sukses!',
        `Catatan Anda Berhasil Dipindahkan Ke ${
          isArchived ? 'Arsip' : 'Catatan Aktif'
        }`,
      );

      return {
        notes: updatedNotes,
      };
    });
  }

  searchNotes(event) {
    this.setState({
      searchNotes: event.target.value,
    });
  }

  searchArchivedNotes() {
    const { notes, searchNotes } = this.state;
    return notes.filter((note) =>
      note.title.toLowerCase().includes(searchNotes.toLowerCase()),
    );
  }

  render() {
    const { searchNotes } = this.state;
    const activeNotes = this.searchArchivedNotes().filter(
      (note) => !note.archived,
    );
    const archiveNotes = this.searchArchivedNotes().filter(
      (note) => note.archived,
    );

    return (
      <>
        <Navbar
          onSearch={this.searchNotes}
          search={searchNotes}
        />

        <section className="note-app__body">
          <NoteInput addNotes={this.addNotesHandler} />

          <h2>Catatan Aktif</h2>
          <NoteList
            key="activeNotes"
            notes={activeNotes}
            onDelete={this.deleteNotesHandler}
            onToggle={this.toggleArchiveStatus}
          />

          <h2>Arsip</h2>
          <NoteList
            key="archiveNotes"
            notes={archiveNotes}
            onDelete={this.deleteNotesHandler}
            onToggle={this.toggleArchiveStatus}
          />
        </section>
      </>
    );
  }
}

export default App;
