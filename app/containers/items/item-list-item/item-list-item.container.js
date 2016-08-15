import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ListItem from '../../../components/list-item/list-item.component';
import { loadItem } from '../../../actions/items.actions';

function ItemListItemContainer(props) {
  function onClickCallback() {
    browserHistory.push(`/items/${props.data._id}`);
    return props.loadItem(props.data._id);
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
  data: PropTypes.object.isRequired,
  loadItem: PropTypes.func.isRequired,
  itemsState: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    itemsState: state.itemsState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadItem }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemListItemContainer);
