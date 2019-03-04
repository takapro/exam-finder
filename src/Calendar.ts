import compareAsc from 'date-fns/compareAsc';
import differenceInDays from 'date-fns/differenceInDays';
import startOfDay from 'date-fns/startOfDay';
import parseDate from 'date-fns/parse';
import { mergeSort } from './Utils';

export interface Calendar<T> {
  date: Date;
  rows: CalendarRow<T>[];
}

export interface CalendarRow<T> {
  end: Date;
  items: CalendarItem<T>[];
}

export interface CalendarItem<T> {
  start: Date;
  end: Date;
  value?: T;
}

export interface VerticalCalendar<T> {
  hour: number;
  values: {
    span: number;
    value: T | undefined;
  }[];
}

export const createCalendar = <T extends {}>(items: CalendarItem<T>[]): Calendar<T>[] => {
  const calendar: Calendar<T>[] = [];
  let current: Calendar<T> | null = null;
  mergeSort(items, (a, b) => compareAsc(a.start, b.start)).forEach(item => {
    if (current === null || differenceInDays(item.start, current.date) >= 1) {
      current = {
        date: startOfDay(item.start),
        rows: [{ end: item.end, items: [item] }]
      };
      calendar.push(current);
    } else {
      const row = current.rows.find(row => row.end <= item.start);
      if (row) {
        row.end = item.end;
        row.items.push(item);
      } else {
        current.rows.push({ end: item.end, items: [item] });
      }
    }
  });
  return calendar;
};

export const gappedCalendarItems = <T extends {}>(items: CalendarItem<T>[], start: Date, end: Date): CalendarItem<T>[] => {
  const result: CalendarItem<T>[] = [];
  let prevEnd = start;
  items.forEach(item => {
    if (item.start > prevEnd) {
      result.push({ start: prevEnd, end: item.start });
    }
    result.push(item);
    prevEnd = item.end;
  });
  if (end > prevEnd) {
    result.push({ start: prevEnd, end: end });
  }
  return result;
};

export const createVerticalCalendar = <T extends {}>(calendar: Calendar<T>[], start: number, end: number, step: number): VerticalCalendar<T>[] => {
  const hours = Array.from(Array((end - start) / step), (_, index) => start + step * index);
  const data = calendar.flatMap(each => each.rows.map(row => hours.map(hour => {
    const time = parseDate(`${Math.floor(hour)}:${(hour - Math.floor(hour)) * 60}`, 'H:m', each.date);
    const item = row.items.find(item => time >= item.start && time < item.end);
    return item && item.value;
  }))) as (T | undefined)[][]; // TypeScript's type inference seems to be broken here...
  const countSpan = (array: (T | undefined)[], index: number) => {
    let i = index;
    while (i < array.length && array[i] === array[index]) { i++; }
    return i - index;
  };
  return hours.map((hour, i) => {
    const values = data.flatMap(each => (i > 0 && each[i] === each[i - 1]) ? [] : [{ span: countSpan(each, i), value: each[i] }]);
    return { hour, values };
  });
};
