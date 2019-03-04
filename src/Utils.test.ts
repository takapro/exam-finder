import { mergeSort } from './Utils';

const array: { key: number, value: string }[] = [
  { key: 1, value: 'a' },
  { key: 2, value: 'd' },
  { key: 3, value: 'g' },
  { key: 4, value: 'j' },
  { key: 5, value: 'm' },
  { key: 6, value: 'p' },
  { key: 7, value: 's' },
  { key: 8, value: 'v' },
  { key: 9, value: 'y' },
  { key: 1, value: 'b' },
  { key: 2, value: 'e' },
  { key: 3, value: 'h' },
  { key: 4, value: 'k' },
  { key: 5, value: 'n' },
  { key: 6, value: 'q' },
  { key: 7, value: 't' },
  { key: 8, value: 'w' },
  { key: 9, value: 'z' },
  { key: 1, value: 'c' },
  { key: 2, value: 'f' },
  { key: 3, value: 'i' },
  { key: 4, value: 'l' },
  { key: 5, value: 'o' },
  { key: 6, value: 'r' },
  { key: 7, value: 'u' },
  { key: 8, value: 'x' },
];

test('mergeSort', () => {
  const sorted = mergeSort(array, (a, b) => a.key - b.key);
  expect(sorted.map(each => each.value).join('')).toBe('abcdefghijklmnopqrstuvwxyz');
});
