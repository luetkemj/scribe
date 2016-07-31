import React from 'react';
import createFragment from 'react-addons-create-fragment';
import { isArray, map, isUndefined } from 'lodash';

// http://codereview.stackexchange.com/questions/106260/generation-of-a-dl-in-react-without-div-wrapping-elements

/**
 * Creates a React <dd> fragment for the given value. If value is an array, a fragment will be
 * created which encapsulates all values.
 * @param  {any|Array<any>} value A singular value will return a react fragment containing just the
 * one value encapsulated in a <dd>. Otherwise, a Fragment will be returned that contains many <dd>.
 * @return {ReactElement} A React fragment contain the definition values
 */
function createDefinitionValueFragments(value) {
  if (isArray(value)) {
    return value.map((val) =>
      (<dd>{val}</dd>)
    );
  }

  return (<dd>{value}</dd>);
}

/**
 * Creates a <dt> with associated <dd>s inside of a React fragment. Fragments are keyed.
 * @param  {string} label A human-readable description of the definition
 * @param  {any|Array<any>} value a value, or a set of values. If given a set of values, multiple
 * <dd> elements will be generated; these elements will be keyed using their array index.
 * @return {ReactElement} A definition list in React element form.
 */
export function createDefinitionFragment(label, value) {
  if (!isUndefined(value)) {
    return createFragment({
      definition: <dt>{label}: </dt>,
      value: createDefinitionValueFragments(value),
    });
  }
  return createFragment({});
}


/**
 * Creates a <dl> element using React from the given map.
 * @param  {Map<string, any|Array<any>>} map A map of name-value pairs. The keys of the map are used
 * as labels for definitions, so they should be legible. The values are used as the value of the
 * definition. If there are multiple values to a definition (i.e, an array), then multiple <dd>
 * elements will be created for the resultant <dt>.
 * @return {ReactElement} A React element encapsulating the <dl>.
 */

export function createDefinitionList(actions) {
  return (<dl>
    {map(actions, (action) => createDefinitionFragment(action.name, action.desc))}
  </dl>);
}
