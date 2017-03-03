import * as _ from 'lodash';

export function numberfy(object, keys) {
  let newObject = object;

  _.each(keys, (key) => {
    if (!_.isUndefined(newObject[key])) {
      newObject = Object.assign({}, newObject, {
        [key]: Number(newObject[key]),
      });
    }
  });

  return newObject;
}

export function buildItemUI(item) {
  const { length, value, weight } = item;
  const itemData = item;

  numberfy(itemData, [length, value, weight]);

  const itemUI = {
    ...itemData,
  };

  return itemUI;
}
