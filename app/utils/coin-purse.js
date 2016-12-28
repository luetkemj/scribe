import * as _ from 'lodash';

const coins = ['CP', 'SP', 'EP', 'GP', 'PP'];

const denominations = {
  CP: {
    name: 'copper',
    abrv: 'CP',
    copperValue: 1,
  },
  SP: {
    name: 'silver',
    abrv: 'SP',
    copperValue: 10,
  },
  EP: {
    name: 'electrum',
    abrv: 'EP',
    copperValue: 50,
  },
  GP: {
    name: 'gold',
    abrv: 'GP',
    copperValue: 100,
  },
  PP: {
    name: 'platinum',
    abrv: 'PP',
    copperValue: 1000,
  },
};

export function parser(exp) {
  // parse value/denomination pairs
  const regexVDP = /([0-9]+[a-z]{2})/gi;

  // parse value from value/denomination pairs
  const regexV = /([0-9]*)/;

  // parse denomination from value/denomination pairs
  const regexD = /[a-z]{2}/i;

  const array = [];

  let m;

  do {
    m = regexVDP.exec(exp);
    if (m) {
      const o = {};
      o.match = m[0];
      o.value = regexV.exec(m[0])[0];
      o.denomination = regexD.exec(m[0])[0].toUpperCase();
      array.push(o);
    }
  } while (m);

  return array;
}

export function copperValue(exp) {
  const parsedCoins = parser(exp);
  let coppers = 0;

  _.each(parsedCoins, (coin) => {
    coppers += (coin.value * denominations[coin.denomination].copperValue);
  });

  return coppers;
}

export function subUnits(coppers) {
  let change = coppers;

  // build an empty purse object.
  const values = _.times(coins.length, _.constant(0));
  const purse = _.zipObject(coins, values);

  // start cursor at the most valuable coin in coins
  let cursor = (coins.length - 1);
  let coin;

  do {
    // get coin at cursor
    coin = coins[cursor];

    // get number of whole subUnits in change
    const subUnit = change / denominations[coin].copperValue;

    // fill purse
    purse[coin] = Math.floor(subUnit);

    // count remaining change
    change %= denominations[coin].copperValue;

    // move cursor to next denomination
    cursor -= 1;
  } while (cursor > -1);

  return purse;
}
