import React, { PropTypes } from 'react';
import { map } from 'lodash';

import style from './definition-list.component.scss';
import { createDefinitionFragment } from '../../utils/fragments.utils';

function createActionsDefinitionList(definitions, dd, dt, verbose) {
  const definitionsStyle = (verbose)
    ? `${style.definitions} ${style.verbose}`
    : `${style.definitions}`;
  return (<dl className={definitionsStyle}>
    {map(definitions, definition => createDefinitionFragment(definition[dt], definition[dd]))}
  </dl>);
}

export default function DefinitionList(props) {
  let definitionsToRender;
  if (props.definitions.length) {
    definitionsToRender =
      createActionsDefinitionList(props.definitions, props.dd, props.dt, props.verbose);
  }

  return (
    <div>
      {definitionsToRender}
    </div>
  );
}

DefinitionList.propTypes = {
  definitions: PropTypes.arrayOf({}).isRequired,
  dd: PropTypes.string.isRequired,
  dt: PropTypes.string.isRequired,
  verbose: PropTypes.bool,
};
