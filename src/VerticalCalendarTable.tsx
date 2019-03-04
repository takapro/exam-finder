import React from 'react';
import formatDate from 'date-fns/format';
import parseDate from 'date-fns/parse';
import { Calendar, CalendarItem, VerticalCalendar, createCalendar, createVerticalCalendar } from './Calendar';
import { Exam } from './Schedule';

const startHour = 8;
const endHour = 22;

const VerticalCalendarTableHead = (props: { calendar: Calendar<Exam>[] }) => {
  return (
    <thead>
      <tr>
        <th></th>
        {props.calendar.map(each => <td key={formatDate(each.date, 'yyyy-MM-dd')} colSpan={each.rows.length}>
          {formatDate(each.date, 'EEE, MMM dd')}
        </td>)}
      </tr>
    </thead>
  );
};

const VerticalCalendarTableBody = (props: { calendar: VerticalCalendar<Exam>[] }) => {
  return (
    <tbody>
      {props.calendar.map(each =>
        <tr key={'hour-' + each.hour}>
          {each.hour === Math.floor(each.hour) && <th rowSpan={2}>{each.hour}</th>}
          {each.values.map((item, index) => <td key={'column-' + index} rowSpan={item.span}>
            {item.value && item.value.course + '-' + item.value.section}
          </td>)}
        </tr>
      )}
    </tbody>
  );
};

const VerticalCalendarTable = (props: { exams: Exam[] }) => {
  const items: CalendarItem<Exam>[] = props.exams.map(exam => ({
    start: parseDate(exam.date + ' ' + exam.start_time, 'EEE, MMM d, yyyy H:mm', new Date()),
    end: parseDate(exam.date + ' ' + exam.end_time, 'EEE, MMM d, yyyy H:mm', new Date()),
    value: exam
  }));
  const calendar = createCalendar(items);
  const verticalCalendar = createVerticalCalendar(calendar, startHour, endHour, 0.5);
  return (
    <table id='calendar'>
      <VerticalCalendarTableHead calendar={calendar} />
      <VerticalCalendarTableBody calendar={verticalCalendar} />
    </table>
  );
};

export default VerticalCalendarTable;
