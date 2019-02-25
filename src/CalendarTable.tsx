import React from 'react';
import formatDate from 'date-fns/format';
import parseDate from 'date-fns/parse';
import { Calendar, CalendarItem, createCalendar } from './Calendar';
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

const CalendarTableBody = (props: { calendar: Calendar<Exam>[] }) => {
  return (
    <tbody>
      {props.calendar.flatMap(each =>
        each.rows.map((row, index) =>
          <tr key={formatDate(each.date, 'yyyy-MM-dd') + '-' + index}>
            {index === 0 && <td rowSpan={each.rows.length}>{formatDate(each.date, 'EEE, MMM dd')}</td>}
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
      <CalendarTableHead />
      <CalendarTableBody calendar={createCalendar(items)} />
    </table>
  );
};

export default CalendarTable;
