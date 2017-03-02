import React, { Component } from 'react';
import { cloneDeep, remove, find } from 'lodash';
import Log from '../../components/log/log.component';

export default class LogTestContainer extends Component {
  // setup initial state that we can use to mock our store.
  state = {
    tempNotes: [],
    notes: [
      {
        _id: 0,
        heading: 'Note',
        content: 'My last Note!',
        creating: false,
        deleting: false,
      },
    ],
    editingNotes: false,
  }

  editNotes = () => {
    // in order to support cancelation of edits we need to clone our inital notes as temp notes so
    // we can revert to the initial notes on cancel - or set inital notes = temp notes on save.
    const tempNotes = cloneDeep(this.state.notes);
    this.setState({
      tempNotes,
      editingNotes: true,
    });
  }

  cancelEditNotes = () => {
    // on cancel we erase tempNotes and set editingNotes to false.
    this.setState({
      editingNotes: false,
      tempNotes: [],
    });
  }

  updateTempNotes = (id, content) => {
    // updateTempNotes is used in an onChange event on the input so that we can always keep our
    // tempNotes current.
    if (this.state.editingNotes) {
      const tempNotes = this.state.tempNotes;
      const tempNote = find(tempNotes, { _id: id });
      tempNote.content = content;

      this.setState({
        tempNotes,
      });
    }
  }

  saveNotes = () => {
    remove(this.state.tempNotes, note => note.deleting);
    // on save we clone tempNotes to notes, wipe the tempNotes, and set editingNotes to false.
    const notes = cloneDeep(this.state.tempNotes);

    this.setState({
      notes,
      tempNotes: [],
      editingNotes: false,
    });
  }

  addNote = () => {
    const tempNotes = this.state.notes;
    const id = tempNotes.length;

    tempNotes.push({
      _id: id,
      heading: 'Note',
      content: '',
      creating: true,
      editing: false,
      deleting: false,
    });

    this.setState({
      tempNotes,
      creatingNotes: true,
    });
  }

  cancelAddNote = () => {
    this.setState({
      tempNotes: [],
      creatingNote: false,
    });
  }

  submitAddNote = (content) => {
    const tempNotes = this.state.tempNotes;
    const index = [tempNotes.length - 1];
    // save the new note contents to the existing tempNote in our tempNotes array.
    tempNotes[index].content = content;
    tempNotes[index].creating = false;

    // assign tempNotes back to our notes so we can save them on the log
    const notes = tempNotes;
    // const log = Object.assign({}, this.props.log, { notes });
    // this.props.updateLog(log);

    this.setState({
      notes,
      tempNotes: [],
      creatingNote: false,
    });
  }

  toggleNoteDeletion = (id) => {
    // toggle a deleting flag so we can remove all flagged notes on save.
    const tempNotes = this.state.tempNotes;
    const tempNote = find(tempNotes, { _id: id });

    tempNote.deleting = !tempNote.deleting;

    this.setState({
      tempNotes,
    });
  }

  render() {
    let notes;
    // if we are editing or creating use our tempNotes for props
    if (this.state.editingNotes || this.state.creatingNote) {
      notes = this.state.tempNotes;
    // if we are not editing use our notes on props
    } else {
      notes = this.state.notes;
    }

    return (
      <div
        style={{
          width: '300px',
          margin: '0 auto',
        }}
      >
        <Log
          day={1}
          time={'00:00:00'}
          season={'Winter'}
          weather={'Rainy and cold'}
          notes={notes}
          save={this.saveNotes}
          addNote={this.addNote}
          cancelAddNote={this.cancelAddNote}
          submitAddNote={this.submitAddNote}
          updateTempNotes={this.updateTempNotes}
          editNotes={this.editNotes}
          cancelEditNotes={this.cancelEditNotes}
          toggleNoteDeletion={this.toggleNoteDeletion}
        />

        <pre>
          {JSON.stringify(this.state, null, 2)}
        </pre>
      </div>
    );
  }
}
