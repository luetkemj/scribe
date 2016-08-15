import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ItemsContainer from '../items.container';
import ItemDetails from '../../../components/item-details/item-details.component';
import { loadItem } from '../../../actions/items.actions.js';
import style from './item-details.scss';

class ItemDetailsContainer extends Component {
  componentWillMount() {
    this.props.loadItem(this.props.params.id);
  }

  render() {
    const { item } = this.props.itemsState;
    let itemToRender;
    if (item) {
      itemToRender = (
        <ItemDetails className={style.itemDetails} data={item} />
      );
    }
    return (
      <div className={style.itemDetailsContainer}>
        <div className={style.colOne}>
          <ItemsContainer />
        </div>
        <div className={style.colTwo}>
          {itemToRender}
        </div>
      </div>
    );
  }
}

ItemDetailsContainer.propTypes = {
  itemsState: PropTypes.object.isRequired,
  loadItem: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
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
)(ItemDetailsContainer);
