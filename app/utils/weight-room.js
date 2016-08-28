export function parser(exp) {
  // parse value/unit pairs
  const regexVUP = /([0-9]+[lb]{2})/gi;

  // parse value from value/unit pairs
  const regexV = /([0-9]*)/;

  // parse unit from value/unit pairs
  const regexU = /[lb]{2}/i;

  const array = [];

  let m;

  do {
    m = regexVUP.exec(exp);
    if (m) {
      const o = {};
      o.match = m[0];
      o.value = regexV.exec(m[0])[0];
      o.unit = regexU.exec(m[0])[0].toUpperCase();
      array.push(o);
    }
  } while (m);

  return array;
}
