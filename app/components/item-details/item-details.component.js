import React, { PropTypes } from 'react';

import style from './item-details.component.scss';

import DefinitionList from '../definition-list/definition-list.component';

export default function ItemDetails({ data }) {
  let header;
  let details;
  let description;

  if (data._id) {
    const detailsData = [
      {
        name: 'Cost',
        stat: `${data.value} ${data.value_unit}`,
      }, {
        name: 'Weight',
        stat: `${data.weight} ${data.weight_unit}`,
      },
      {
        name: 'Length',
        stat: `${data.length} ${data.length_unit}`,
      },
    ];

    const descriptionData = [
      {
        name: 'description',
        stat: data.description,
      },
    ];

    details = (
      <DefinitionList
        definitions={detailsData}
        dt={'name'}
        dd={'stat'}
      />
    );

    description = (
      <DefinitionList
        definitions={descriptionData}
        dt={'name'}
        dd={'stat'}
      />
    );
  }

  return (
    <section className={style.itemDetails}>
      <article>
        <header>
          <h1 className={style.name}>{data.name}</h1>
        </header>
        {details}
        {description}
      </article>
    </section>
  );
}

ItemDetails.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    value: PropTypes.num,
    value_unit: PropTypes.string,
    weight: PropTypes.num,
    weight_unit: PropTypes.string,
    length: PropTypes.num,
    length_unit: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
