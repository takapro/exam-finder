export const mergeSort = <T extends {}>(array: T[], compare: (a: T, b: T) => number): T[] => {
  if (array.length < 2) {
    return array;
  }
  const middle = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, middle), compare);
  const right = mergeSort(array.slice(middle), compare);
  const result: T[] = [];
  while (left.length > 0 && right.length > 0) {
    if (compare(left[0], right[0]) <= 0) {
      result.push(left.shift()!);
    } else {
      result.push(right.shift()!);
    }
  }
  while (left.length > 0) {
    result.push(left.shift()!);
  }
  while (right.length > 0) {
    result.push(right.shift()!);
  }
  return result;
}
