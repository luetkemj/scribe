import React from 'react';

import ListItem from '../../components/list-item/list-item.component';

export default function ListItemTestContainer() {
  function noop() {}

  return (
    <div>
      <h1>ListItem Active</h1>
      <ListItem
        active
        name={'listItem'}
        onClick={noop}
      />

      <h1>ListItem Inactive</h1>
      <ListItem
        active={false}
        name={'listItem'}
        onClick={noop}
      />
    </div>
  );
}
