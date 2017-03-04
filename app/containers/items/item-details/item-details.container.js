import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Spinner from '../../../components/spinner/spinner.component';
import DefinitionList from '../../../components/definition-list/definition-list.component';

import { loadItemIfNeeded } from '../../../actions/items.actions';

import style from './item-details.container.scss';

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
      const detailsData = [
        {
          name: 'Cost',
          stat: `${item.value} ${item.value_unit}`,
        }, {
          name: 'Weight',
          stat: `${item.weight} ${item.weight_unit}`,
        },
        {
          name: 'Length',
          stat: `${item.length} ${item.length_unit}`,
        },
      ];

      const descriptionData = [
        {
          name: 'description',
          stat: item.description,
        },
      ];

      const headerToRender = (
        <header>
          <h1 className={style.name}>{item.name}</h1>
        </header>
      );

      const detailsToRender = (
        <DefinitionList
          definitions={detailsData}
          dt={'name'}
          dd={'stat'}
        />
      );

      const descriptionToRender = (
        <DefinitionList
          definitions={descriptionData}
          dt={'name'}
          dd={'stat'}
        />
      );

      itemToRender = (
        <section className={style.itemDetails}>
          <article>
            {headerToRender}
            {detailsToRender}
            {descriptionToRender}
          </article>
        </section>
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
  itemsState: PropTypes.shape({
    item: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      value: PropTypes.number,
      value_unit: PropTypes.string,
      weight: PropTypes.number,
      weight_unit: PropTypes.string,
      length: PropTypes.number,
      length_unit: PropTypes.string,
    }),
    loadingItem: PropTypes.bool,
  }).isRequired,
  loadItemIfNeeded: PropTypes.func.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
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
)(ItemDetailsContainer);
