// alternates pushing and shifting elements from candidate onto new array.
// Example: [5,4,3,2,1] > [1,3,5,4,2]
export function shimmy(array) {
  const newArray = [];

  for (let i = 0; i < array.length; i += 1) {
    if (i % 2) {
      newArray.push(array[i]);
    } else {
      newArray.unshift(array[i]);
    }
  }

  return newArray;
}
