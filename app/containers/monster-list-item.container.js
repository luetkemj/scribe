import React, { PropTypes } from 'react';

import ListItem from '../components/list-item/list-item.component';

export default function MonsterListItemContainer({ data }) {
  const monsterData = {
    _id: data._id,
    linkPath: `/monsters/${data._id}`,
    name: data.name,
  };

  return (
    <ListItem
      data={monsterData}
    />
  );
}

MonsterListItemContainer.propTypes = {
  data: PropTypes.object.isRequired,
};
