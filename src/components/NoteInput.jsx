import React from 'react';
import autoBind from 'react-autobind';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      titleError: '',
      bodyError: '',
    };

    autoBind(this);
  }

  validateTitle = () => {
    const { title } = this.state;

    if (title.trim() === '') {
      this.setState({ titleError: 'Judul tidak boleh kosong.' });
      return true; 
    }

    if (title.length < 3 || title.length > 50) {
      this.setState({
        titleError: 'Judul harus setidaknya memiliki 3 sampai 50 karakter.',
      });
      return true;
    }

    this.setState({ titleError: '' });
    return false;
  };

  validateBody = () => {
    const { body } = this.state;

    if (body.trim() === '') {
      this.setState({ bodyError: 'Isi Catatan tidak boleh kosong.' });
      return true;
    }

    if (body.length < 3 || body.length > 200) {
      this.setState({
        bodyError: 'Isi Catatan harus setidaknya memiliki 3 sampai 200 karakter.',
      });
      return true; 
    }

    this.setState({ bodyError: '' });
    return false;
  };

  onChangeTitle(event) {
    const title = event.target.value;
    const length = title.length;

    if (length > 50) {
      this.setState({
        titleError: 'Judul tidak boleh lebih dari 50 karakter.',
      });
      return;
    }

    this.setState({
      title: title,
      titleError: '',
    });
  }

  onChangeBody(event) {
    const body = event.target.value;
    const length = body.length;

    if (length > 200) {
      this.setState({ bodyError: 'Body tidak boleh lebih dari 200 karakter.' });
      return;
    }

    this.setState({
      body: body,
      bodyError: '',
    });
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.validateTitle() || this.validateBody()) {
      return;
    }

    this.props.addNotes(this.state);

    this.setState({
      title: '',
      body: '',
      titleError: '',
      bodyError: '',
    });
  }

  onLimitCharHandler(text, limit) {
    return limit - text.length;
  }

  render() {
    const { title, body, titleError, bodyError } = this.state;
    const titleCharacter = this.onLimitCharHandler(title, 50);
    const bodyCharacter = this.onLimitCharHandler(body, 200);

    return (
      <form
        onSubmit={this.onSubmit}
        className="note-input"
      >
        <h1 className="note-input__title">Buat catatan</h1>
        <div className="note-input__label-group">
          <label htmlFor="title" className='note-input__label'>Judul</label>
          <p className="note-input__title__char-limit">
            Judul maksimal{' '}
            {titleCharacter < 0 ? (
              <span className="error-text">lebih dari batas</span>
            ) : (
              <span className="character-count">{titleCharacter}</span>
            )}{' '}
            karakter
          </p>
        </div>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Judul Catatan..."
          value={title}
          onChange={this.onChangeTitle}
        />
        <p className="note-input__error-text">{titleError}</p>
        <div className="note-input__label-group">
          <label htmlFor="body" className='note-input__label'>Isi Catatan</label>
          <p className="note-input__title__char-limit">
            Body maksimal{' '}
            {bodyCharacter < 0 ? (
              <span className="error-text">lebih dari batas</span>
            ) : (
              <span className="character-count">{bodyCharacter}</span>
            )}{' '}
            karakter
          </p>
        </div>
        <textarea
          id="body"
          name="body"
          cols="30"
          rows="10"
          placeholder="Isi Catatan..."
          value={body}
          onChange={this.onChangeBody}
        />
        <p className="note-input__error-text">{bodyError}</p>
        <button type="submit">Simpan</button>
      </form>
    );
  }
}

export default NoteInput;
