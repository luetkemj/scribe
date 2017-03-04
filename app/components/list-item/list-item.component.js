import React, { PropTypes } from 'react';

import style from './list-item.component.scss';

export default function ListItem({ active, name, onClick }) {
  const listItem = (active ? `${style.listItem} ${style.active}` : `${style.listItem}`);

  return (
    <div className={listItem}>
      <button onClick={onClick}>{name}</button>
    </div>
  );
}

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

ListItem.defaultProps = {
  onClick: null,
};
