import React, { PropTypes, Component } from 'react';
import Textarea from 'react-textarea-autosize';

import style from './note.component.scss';

export default class Note extends Component {
  state = {
    content: this.props.content,
    editing: this.props.editing,
    deleting: this.props.deleting,
    cancelAddNote: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });

    this.props.updateTempNotes(this.props.id, event.target.value);
  }

  submit = (event) => {
    this.setState({
      creating: false,
    });

    event.currentTarget.blur();
    event.preventDefault();

    const content = this.state.content;
    this.props.submitAddNote(event, content);
  }

  cancel = (event) => {
    this.props.cancelAddNote(event);

    event.currentTarget.blur();
    event.preventDefault();
  }

  deleting = () => {
    this.props.toggleNoteDeletion(this.props.id);
  }

  render() {
    const { heading, content } = this.props;
    const isDisabled = !this.state.content;

    let noteToRender;
    let contentToRender;
    let createFormToRender;
    let editFormToRender;

    if (!this.props.creating && !this.props.editing) {
      contentToRender = (
        <div className={style.content}>{
          content.split('\n').map(item => (
            <span>
              {item}
              <br />
            </span>
          ))
          }
        </div>
      );
    }

    if (this.props.creating) {
      createFormToRender = (
        <div>
          <form className={style.form}>
            <Textarea
              type="text"
              className={style.input}
              name="content"
              placeholder=""
              value={this.state.content}
              onChange={this.handleChange}
            />
            <button
              className={style.submit}
              onClick={this.submit}
              disabled={isDisabled}
            >SUBMIT</button>
          </form>
          <button
            className={style.cancel}
            onClick={this.cancel}
          >CANCEL</button>
        </div>
      );
    }

    if (this.props.editing) {
      editFormToRender = (
        <div className={style.form}>
          <Textarea
            type="text"
            className={style.input}
            name="content"
            value={this.props.content}
            onChange={this.handleChange}
          />
          <button
            className={style.delete}
            onClick={this.deleting}
          />
        </div>
      );
    }

    let noteClasses = `${style.note} `;
    if (this.props.deleting) {
      noteClasses += `${style.deleting}`;
    }

    if (!this.state.cancelAddNote) {
      noteToRender = (
        <div className={noteClasses}>
          <strong className={style.heading}>{heading}: </strong>
          {contentToRender}
          {createFormToRender}
          {editFormToRender}
        </div>
      );
    }

    return (
      <div>
        {noteToRender}
      </div>
    );
  }
}

Note.propTypes = {
  id: PropTypes.string,
  heading: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  creating: PropTypes.bool,
  editing: PropTypes.bool,
  deleting: PropTypes.bool,

  submitAddNote: PropTypes.func.isRequired,
  cancelAddNote: PropTypes.func.isRequired,
  updateTempNotes: PropTypes.func.isRequired,
  toggleNoteDeletion: PropTypes.func.isRequired,
};
