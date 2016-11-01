import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ItemDetails from '../../../components/item-details/item-details.component';
import Spinner from '../../../components/spinner/spinner.component';
import { loadItemIfNeeded } from '../../../actions/items.actions.js';

class ItemDetailsContainer extends Component {
  componentWillMount() {
    this.props.loadItemIfNeeded(this.props.params.id);
  }

  render() {
    const { item, loadingItem } = this.props.itemsState;
    let itemToRender;
    let spinnerToRender;

    if (loadingItem) {
      spinnerToRender = (
        <Spinner />
      );
    }

    if (item) {
      itemToRender = (
        <ItemDetails data={item} />
      );
    }
    return (
      <div>
        {spinnerToRender}
        {itemToRender}
      </div>
    );
  }
}

ItemDetailsContainer.propTypes = {
  itemsState: PropTypes.object.isRequired,
  loadItemIfNeeded: PropTypes.func.isRequired,
  params: PropTypes.object,
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
)(ItemDetailsContainer);
