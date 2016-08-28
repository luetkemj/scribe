import React, { Component, PropTypes } from 'react';
import style from './item-form.component.scss';
import * as coinPurse from '../../utils/coin-purse';
import * as weightRoom from '../../utils/weight-room';

export default class ItemForm extends Component {
  state = {
    name: '',
    weight: '',
    cost: '',
    description: '',
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submit = (event) => {
    // unfocus the button after it was clicked
    event.currentTarget.blur();

    // prevent the form submission
    event.preventDefault();

    const parsedCost = coinPurse.parser(this.state.cost);
    const parsedWeight = weightRoom.parser(this.state.weight);

    const ITEM_TEMPLATE = {
      name: this.state.name,
      weight: {
        value: parsedWeight[0].value,
        unit: parsedWeight[0].unit,
      },
      cost: {
        value: parsedCost[0].value,
        unit: parsedCost[0].denomination,
      },
      description: this.state.description,
    };

    this.props.submitItem(ITEM_TEMPLATE);
  }

  render() {
    const isDisabled = this.props.isWaiting;

    return (
      <div className={style.itemForm}>
        <form className={style.form}>
          <input
            disabled={this.props.isWaiting}
            className={style.input}
            autoFocus
            name="name"
            placeholder={'name'}
            value={this.state.name}
            onChange={this.handleChange}
          />

          <input
            disabled={this.props.isWaiting}
            className={style.input}
            autoFocus
            name="weight"
            placeholder={'weight'}
            value={this.state.weight}
            onChange={this.handleChange}
          />

          <input
            disabled={this.props.isWaiting}
            className={style.input}
            autoFocus
            name="cost"
            placeholder={'cost'}
            value={this.state.cost}
            onChange={this.handleChange}
          />

          <input
            disabled={this.props.isWaiting}
            className={style.input}
            autoFocus
            name="description"
            placeholder={'description'}
            value={this.state.description}
            onChange={this.handleChange}
          />

          <button
            className={style.button}
            type="submit"
            onClick={this.submit}
            disabled={isDisabled}
          >Submit</button>
        </form>
      </div>
    );
  }
}

ItemForm.propTypes = {
  isWaiting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  submitItem: PropTypes.func.isRequired,
};
