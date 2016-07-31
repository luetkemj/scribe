import React, { PropTypes } from 'react';
import style from './list.component.scss';

import Spinner from '../spinner/spinner.component';

export default function List({ data, ListItemContainer, loading }) {
  let key = 0;
  const listItemsToRender = data.map(listItem =>
    <ListItemContainer key={key++} data={listItem} />
  );

  let spinner;

  if (!loading) {
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
  data: PropTypes.array,
  ListItemContainer: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
