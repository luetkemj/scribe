import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ListItem from '../../../components/list-item/list-item.component';
import { loadItemIfNeeded } from '../../../actions/items.actions';

function ItemListItemContainer(props) {
  function onClickCallback() {
    browserHistory.push(`/items/${props.data._id}`);
    return props.loadItemIfNeeded(props.data._id);
  }

  const active = props.itemsState.item._id === props.data._id;

  return (
    <ListItem
      active={active}
      name={props.data.name}
      onClick={onClickCallback}
    />
  );
}

ItemListItemContainer.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  loadItemIfNeeded: PropTypes.func.isRequired,
  itemsState: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    itemsState: state.itemsState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadItemIfNeeded }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemListItemContainer);
