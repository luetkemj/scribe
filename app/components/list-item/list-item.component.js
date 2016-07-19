import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import style from './list-item.component.scss';

export default function ListItem({ data }) {
  return (
    <div className={style.listItem}>
      <Link to={data.linkPath}>{data.name}</Link>
    </div>
  );
}

ListItem.propTypes = {
  data: PropTypes.object.isRequired,
};
