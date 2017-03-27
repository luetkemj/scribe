import React, { Component, PropTypes } from 'react';
import uuid from 'uuid/v1';
import style from './log.component.scss';
import Note from '../note/note.component';

export default class Log extends Component {
  state = {
    editing: false,
    addingNote: false,
  }

  delete = (event) => {
    event.currentTarget.blur();
    event.preventDefault();

    this.props.delete(this.props.log);
  }

  edit = (event) => {
    this.setState({
      editing: true,
    });

    event.currentTarget.blur();
    event.preventDefault();

    this.props.editNotes();
  }

  save = (event, notes) => {
    this.setState({
      editing: false,
    });

    event.currentTarget.blur();
    event.preventDefault();

    this.props.save(notes);
  }

  cancel = (event) => {
    this.setState({
      editing: false,
      addingNote: false,
    });

    event.currentTarget.blur();
    event.preventDefault();

    this.props.cancelEditNotes();
  }

  addNote = (event) => {
    this.setState({
      addingNote: true,
    });

    event.currentTarget.blur();
    event.preventDefault();

    this.props.addNote();
  }

  cancelAddNote = (event) => {
    this.setState({
      addingNote: false,
    });

    event.currentTarget.blur();
    event.preventDefault();

    this.props.cancelAddNote();
  }

  submitAddNote = (event, content) => {
    this.setState({
      addingNote: false,
    });

    event.currentTarget.blur();
    event.preventDefault();

    this.props.submitAddNote(content);
  }

  updateTempNotes = (id, content) => {
    this.props.updateTempNotes(id, content);
  }

  render() {
    const { day, time, weather, season, notes } = this.props;
    let editButtonToRender;
    let cancelButtonToRender;
    let saveButtonToRender;
    let addNoteButtonToRender;
    let deleteButtonToRender;
    let notesToRender;

    if (this.state.editing) {
      cancelButtonToRender = (
        <button className={style.cancel} onClick={this.cancel}>CANCEL</button>
      );

      saveButtonToRender = (
        <button className={style.save} onClick={this.save}>SAVE</button>
      );

      deleteButtonToRender = (
        <button className={style.delete} onClick={this.delete}>DELETE</button>
      );
    }

    if (!this.state.addingNote && !this.state.editing) {
      addNoteButtonToRender = (
        <button className={style.addNote} onClick={this.addNote}>ADD NOTE</button>
      );

      editButtonToRender = (
        <button className={style.edit} onClick={this.edit}>EDIT</button>
      );
    }

    if (notes) {
      notesToRender = notes.map((note) => {
        const { _id, heading, content, creating, deleting } = note;
        const id = _id || uuid();
        return (
          <Note
            key={id}
            id={id}
            heading={heading}
            content={content}
            creating={creating}
            deleting={deleting}
            editing={this.state.editing}
            submitAddNote={this.submitAddNote}
            cancelAddNote={this.cancelAddNote}
            updateTempNotes={this.updateTempNotes}
            toggleNoteDeletion={this.props.toggleNoteDeletion}
          />
        );
      });
    }

    return (
      <div className={style.log}>
        <div className={style.topControls}>
          {editButtonToRender}
          {cancelButtonToRender}
          {saveButtonToRender}
        </div>
        <div className={style.logHeading}>
          <div>
            <div className={style.day}>Day {day}</div>
            <div className={style.time}>{time}</div>
          </div>
          <div>
            <div className={style.season}>{season}</div>
            <div className={style.temp}>{weather.condition}</div>
          </div>
        </div>
        {notesToRender}
        <div className={style.bottomControls}>
          {addNoteButtonToRender}
          {deleteButtonToRender}
        </div>
      </div>
    );
  }
}

Log.propTypes = {
  save: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
  cancelAddNote: PropTypes.func.isRequired,
  submitAddNote: PropTypes.func.isRequired,
  editNotes: PropTypes.func.isRequired,
  cancelEditNotes: PropTypes.func.isRequired,
  updateTempNotes: PropTypes.func.isRequired,
  toggleNoteDeletion: PropTypes.func.isRequired,

  log: PropTypes.shape().isRequired,
  day: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  season: PropTypes.string.isRequired,
  weather: PropTypes.string,
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      heading: PropTypes.string,
      content: PropTypes.string,
      creating: PropTypes.bool,
      deleting: PropTypes.bool,
    }),
  ),
};

Log.defaultProps = {
  notes: [],
  weather: {
    condition: 'cold',
    wind: 'breezey',
    temp: 'cold',
  },
};
