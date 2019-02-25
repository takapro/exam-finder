import compareAsc from 'date-fns/compareAsc';
import differenceInDays from 'date-fns/differenceInDays';
import startOfDay from 'date-fns/startOfDay';
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
