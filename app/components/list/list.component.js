import React, { PropTypes } from 'react';

export default function List({ data, ListItemContainer }) {
  const listItemsToRender = data.map(listItem =>
    <ListItemContainer key={listItem._id} data={listItem} />
  );

  return (
    <div>
      {listItemsToRender}
    </div>
  );
}

List.propTypes = {
  data: PropTypes.array.isRequired,
  ListItemContainer: PropTypes.func.isRequired,
};
