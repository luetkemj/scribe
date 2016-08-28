import React from 'react';

import ItemForm from '../../components/item-form/item-form.component';

export default function ItemFormContainer() {
  function noop() {}

  return (
    <div>
      <h1>Spinner</h1>
      <ItemForm
        isWaiting={false}
        error={null}
        submitItem={noop()}
      />
    </div>
  );
}
