import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ItemsListContainer from './items-list/items-list.container';
import ItemFormContainer from './item-form/item-form.container';
import { loadItems } from '../../actions/items.actions.js';

class ItemsContainer extends Component {
  componentWillMount() {
    this.props.loadItems();
  }

  render() {
    const { items } = this.props.itemsState;
    return (
      <div>
        <ItemsListContainer data={items} />
        <ItemFormContainer />
      </div>
    );
  }
}

ItemsContainer.propTypes = {
  itemsState: PropTypes.object.isRequired,
  loadItems: PropTypes.func.isRequired,
  children: PropTypes.any,
};

function mapStateToProps(state) {
  return {
    itemsState: state.itemsState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadItems }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemsContainer);
