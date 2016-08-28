import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ItemForm from '../../../components/item-form/item-form.component';
import { createItem } from '../../../actions/items.actions.js';

function ItemDetailsContainer(props) {
  function createNewItem(item) {
    props.createItem(item);
  }

  return (
    <ItemForm
      isWaiting={props.itemsState.creatingItem}
      error={props.itemsState.creatingItemError}
      submitItem={createNewItem}
    />
  );
}

ItemDetailsContainer.propTypes = {
  itemsState: PropTypes.object.isRequired,
  createItem: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    itemsState: state.itemsState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createItem }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemDetailsContainer);
