import React from 'react';
import formatDate from 'date-fns/format';
import parseDate from 'date-fns/parse';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import { Calendar, CalendarItem, createCalendar, gappedCalendarItems } from './Calendar';
import { Exam } from './Schedule';

const startHour = 8;
const endHour = 22;
const hours = Array(endHour - startHour).fill(0).map((_, index) => startHour + index)

const CalendarTableHead = () => {
  return (
    <thead>
      <tr>
        <th>DATE</th>
        {hours.map(hour => <th key={'hour-' + hour} colSpan={2}>{hour}</th>)}
      </tr>
    </thead>
  );
};

const calendarTableCell = (date: Date, items: CalendarItem<Exam>[]) => {
  const start = parseDate('' + startHour, 'H', date);
  const end = parseDate('' + endHour, 'H', date);
  return gappedCalendarItems(items, start, end).map((item, index) =>
    <td key={'cell-' + index} className={item.value ? 'cell' : 'gap'} colSpan={differenceInMinutes(item.end, item.start) / 30}>
      {item.value && item.value.course + '-' + item.value.section}
    </td>
  );
}

const CalendarTableBody = (props: { calendar: Calendar<Exam>[] }) => {
  return (
    <tbody>
      {props.calendar.flatMap(each =>
        each.rows.map((row, index) =>
          <tr key={formatDate(each.date, 'yyyy-MM-dd') + '-' + index} className={index === 0 ? 'first' : 'not_first'}>
            {index === 0 && <td className='date' rowSpan={each.rows.length}>{formatDate(each.date, 'EEE, MMM dd')}</td>}
            {calendarTableCell(each.date, row.items)}
          </tr>
        )
      )}
    </tbody>
  );
};

const CalendarTable = (props: { exams: Exam[] }) => {
  const items: CalendarItem<Exam>[] = props.exams.map(exam => ({
    start: parseDate(exam.date + ' ' + exam.start_time, 'EEE, MMM d, yyyy H:mm', new Date()),
    end: parseDate(exam.date + ' ' + exam.end_time, 'EEE, MMM d, yyyy H:mm', new Date()),
    value: exam
  }));
  return (
    <table id='calendar'>
      <colgroup>
        <col className='course' />
        {hours.flatMap(hour => [0, 1].map(index =>
          <col key={'cell-' + hour + '-' + index} className='cell' />
        ))}
      </colgroup>
      <CalendarTableHead />
      <CalendarTableBody calendar={createCalendar(items)} />
    </table>
  );
};

export default CalendarTable;
