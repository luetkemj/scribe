import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import List from '../../../components/list/list.component';
import ItemListItemContainer from '../item-list-item/item-list-item.container';
import { loadItems } from '../../../actions/items.actions.js';

class ItemsListContainer extends Component {
  componentWillMount() {
    this.props.loadItems();
  }

  render() {
    const { items, loadingItems } = this.props.itemsState;

    return (
      <List
        data={items}
        ListItemContainer={ItemListItemContainer}
        loading={loadingItems}
      />
    );
  }
}

ItemsListContainer.propTypes = {
  itemsState: PropTypes.object.isRequired,
  loadItems: PropTypes.func.isRequired,
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
)(ItemsListContainer);
