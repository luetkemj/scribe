/**
 * Takes a number and if it is less than ten, adds a leading zero.
 */
export function leadingZero(number) {
  let newNumber;
  if (number >= 0 && number < 10) {
    newNumber = `0${number}`;
  } else {
    newNumber = `${number}`;
  }

  return newNumber;
}
