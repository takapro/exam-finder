import parseISO from 'date-fns/parseISO';
import parseDate from 'date-fns/parse';
import { CalendarItem, createCalendar, gappedCalendarItems } from './Calendar';

const data: CalendarItem<string>[] = [
  { start: parseISO('2019-04-10T08:30'), end: parseISO('2019-04-10T11:30'), value: 'A' },
  { start: parseISO('2019-04-12T08:30'), end: parseISO('2019-04-10T11:30'), value: 'B' },
  { start: parseISO('2019-04-10T15:30'), end: parseISO('2019-04-10T18:30'), value: 'C' },
  { start: parseISO('2019-04-15T12:00'), end: parseISO('2019-04-10T15:00'), value: 'D' },
  { start: parseISO('2019-04-10T08:30'), end: parseISO('2019-04-10T11:30'), value: 'E' },
];

test('createCalendar', () => {
  const calendar = createCalendar(data);
  expect(calendar.length).toBe(3);
  expect(calendar[0].date).toEqual(parseISO('2019-04-10'));
  expect(calendar[0].rows.length).toBe(2);
  expect(calendar[0].rows[0].items.length).toBe(2);
  expect(calendar[0].rows[0].items[0].value).toBe('A');
  expect(calendar[0].rows[0].items[1].value).toBe('C');
  expect(calendar[0].rows[1].items.length).toBe(1);
  expect(calendar[0].rows[1].items[0].value).toBe('E');
  expect(calendar[1].date).toEqual(parseISO('2019-04-12'));
  expect(calendar[1].rows.length).toBe(1);
  expect(calendar[1].rows[0].items.length).toBe(1);
  expect(calendar[1].rows[0].items[0].value).toBe('B');
  expect(calendar[2].date).toEqual(parseISO('2019-04-15'));
  expect(calendar[2].rows.length).toBe(1);
  expect(calendar[2].rows[0].items.length).toBe(1);
  expect(calendar[2].rows[0].items[0].value).toBe('D');
});

test('gappedCalendarItems', () => {
  const calendar = createCalendar(data);
  const start = parseDate('8', 'H', calendar[0].date);
  const end = parseDate('22', 'H', calendar[0].date);
  expect(start).toEqual(parseISO('2019-04-10T08:00'));
  expect(end).toEqual(parseISO('2019-04-10T22:00'));
  const gappedCalendar = gappedCalendarItems(calendar[0].rows[0].items, start, end);
  expect(gappedCalendar.length).toBe(5);
  expect(gappedCalendar[0].start).toEqual(parseISO('2019-04-10T08:00'));
  expect(gappedCalendar[0].end).toEqual(parseISO('2019-04-10T08:30'));
  expect(gappedCalendar[0].value).toBe(undefined);
  expect(gappedCalendar[1].start).toEqual(parseISO('2019-04-10T08:30'));
  expect(gappedCalendar[1].end).toEqual(parseISO('2019-04-10T11:30'));
  expect(gappedCalendar[1].value).toBe('A');
  expect(gappedCalendar[2].start).toEqual(parseISO('2019-04-10T11:30'));
  expect(gappedCalendar[2].end).toEqual(parseISO('2019-04-10T15:30'));
  expect(gappedCalendar[2].value).toBe(undefined);
  expect(gappedCalendar[3].start).toEqual(parseISO('2019-04-10T15:30'));
  expect(gappedCalendar[3].end).toEqual(parseISO('2019-04-10T18:30'));
  expect(gappedCalendar[3].value).toBe('C');
  expect(gappedCalendar[4].start).toEqual(parseISO('2019-04-10T18:30'));
  expect(gappedCalendar[4].end).toEqual(parseISO('2019-04-10T22:00'));
  expect(gappedCalendar[4].value).toBe(undefined);
});
