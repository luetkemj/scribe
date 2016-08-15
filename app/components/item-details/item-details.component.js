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
        stat: `${data.cost.value} ${data.cost.unit}`,
      }, {
        name: 'Weight',
        stat: `${data.weight.value} ${data.weight.unit}`,
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
  data: PropTypes.object.isRequired,
};
