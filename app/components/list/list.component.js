import React, { PropTypes } from 'react';
import uuid from 'uuid/v1';
import style from './list.component.scss';

import Spinner from '../spinner/spinner.component';

export default function List({ data, ListItemContainer, loading }) {
  const listItemsToRender = data.map(listItem =>
    <ListItemContainer key={uuid()} data={listItem} />,
  );

  let spinner;

  if (loading) {
    spinner = (<Spinner />);
  }

  return (
    <div className={style.list}>
      {spinner}
      {listItemsToRender}
    </div>
  );
}

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  ListItemContainer: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
