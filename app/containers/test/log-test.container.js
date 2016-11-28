import React, { Component } from 'react';
import { cloneDeep, remove } from 'lodash';
import Log from '../../components/log/log.component';

export default class LogTestContainer extends Component {
  // setup initial state that we can use to mock our store.
  state = {
    tempNotes: [],
    notes: [
      {
        id: 0,
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
      tempNotes[Number(id)].content = content;

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
    const notes = this.state.notes;
    const id = notes.length;

    notes.push({
      id,
      heading: 'Note',
      content: '',
      creating: true,
      deleting: false,
    });

    this.setState({
      notes,
    });
  }

  cancelAddNote = () => {
    // we can only add one note at a time so it safe to just pop notes on cancel.
    const notes = this.state.notes;
    notes.pop();

    this.setState({
      notes,
    });
  }

  submitAddNote = (id, content) => {
    const notes = this.state.notes;
    // save the new note contents to the existing note in our notes array.
    notes[Number(id)].content = content;
    notes[Number(id)].creating = false;

    this.setState({
      notes,
    });
  }

  toggleNoteDeletion = (id) => {
    // toggle a deleting flag so we can remove all flagged notes on save.
    const tempNotes = this.state.tempNotes;

    tempNotes[Number(id)].deleting = !tempNotes[Number(id)].deleting;

    this.setState({
      tempNotes,
    });
  }

  render() {
    let notes;
    // if we are not editing use notes
    if (!this.state.editingNotes) {
      notes = this.state.notes;
    // if we are editing use our tempNotes
    } else {
      notes = this.state.tempNotes;
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
