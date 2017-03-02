import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { cloneDeep, find, remove } from 'lodash';

import Log from '../../../components/log/log.component';

import { updateLog, deleteLogs } from '../../../actions/log.actions';
import { buildTimeUI, leadingZero } from '../../../utils/functions';

class LogContainer extends Component {
  state = {
    tempNotes: [],
    editingNotes: false,
    creatingNote: false,
  }

  delete = (log) => {
    const logIds = [log._id];
    this.props.deleteLogs(logIds);
  }

  editNotes = () => {
    // in order to support cancelation of edits we need to clone our inital notes as temp notes so
    // we can revert to the initial notes on cancel - or set inital notes = temp notes on save.
    const tempNotes = cloneDeep(this.props.log.notes);
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
      tempNotes: [],
      editingNotes: false,
    });

    const log = Object.assign({}, this.props.log, { notes });

    this.props.updateLog(log);
  }

  addNote = () => {
    const tempNotes = cloneDeep(this.props.log.notes);

    tempNotes.push({
      heading: 'Note',
      content: '',
      creating: true,
      editing: false,
      deleting: false,
    });

    this.setState({
      tempNotes,
      creatingNote: true,
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
    const log = Object.assign({}, this.props.log, { notes });

    this.props.updateLog(log);

    this.setState({
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
    const { log } = this.props;
    const timeUI = buildTimeUI(log.time);
    const time =
      `${leadingZero(timeUI.hours)}:${leadingZero(timeUI.minutes)}:${leadingZero(timeUI.seconds)}`;

    let notes;
    // if we are editing or creating use our tempNotes for props
    if (this.state.editingNotes || this.state.creatingNote) {
      notes = this.state.tempNotes;
    // if we are not editing use our notes on props
    } else {
      notes = this.props.log.notes;
    }

    return (
      <div>
        <Log
          day={timeUI.days + 1}
          time={time}
          season={log.season}
          weather={log.weather}
          notes={notes}
          log={log}
          save={this.saveNotes}
          delete={this.delete}
          addNote={this.addNote}
          cancelAddNote={this.cancelAddNote}
          submitAddNote={this.submitAddNote}
          updateTempNotes={this.updateTempNotes}
          editNotes={this.editNotes}
          cancelEditNotes={this.cancelEditNotes}
          toggleNoteDeletion={this.toggleNoteDeletion}
        />
      </div>
    );
  }
}

LogContainer.propTypes = {
  log: PropTypes.shape(),
  updateLog: PropTypes.func.isRequired,
  deleteLogs: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateLog, deleteLogs }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps,
)(LogContainer);
