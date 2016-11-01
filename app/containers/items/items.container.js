import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ItemListItemContainer from './item-list-item/item-list-item.container';
import List from '../../components/list/list.component';

import { loadItemsIfNeeded } from '../../actions/items.actions.js';
import style from './items.container.scss';

class ItemsContainer extends Component {
  componentWillMount() {
    this.props.loadItemsIfNeeded();
  }

  render() {
    const { items, loadingItems } = this.props.itemsState;
    return (
      <div className={style.itemsContainer}>
        <div className={style.colOne}>
          <List
            data={items}
            ListItemContainer={ItemListItemContainer}
            loading={loadingItems}
          />
        </div>
        <div className={style.colTwo}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

ItemsContainer.propTypes = {
  itemsState: PropTypes.object.isRequired,
  loadItemsIfNeeded: PropTypes.func.isRequired,
  children: PropTypes.any,
};

function mapStateToProps(state) {
  return {
    itemsState: state.itemsState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadItemsIfNeeded }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemsContainer);
