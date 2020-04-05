import React from 'react';
import formatDate from 'date-fns/format';
import { Calendar, VerticalCalendar, createVerticalCalendar } from './Calendar';
import { Exam } from './Schedule';

const startHour = 8;
const endHour = 22;

const calendarTableCols = (calendar: Calendar<Exam>[]): JSX.Element => {
  return (
    <colgroup>
      <col className='dummy' />
      <col className='hour' />
      {calendar.flatMap(each => {
        const date = formatDate(each.date, 'yyyy-MM-dd');
        return each.rows.map((_, index) =>
          <col key={date + '-' + index} className={index < each.rows.length - 1 ? 'not_last' : 'last'} />
        );
      })}
      <col className='margin' />
    </colgroup>
  );
};

const calendarTableHead = (calendar: Calendar<Exam>[]): JSX.Element => {
  return (
    <thead>
      <tr>
        <td className='dummy'></td>
        <th></th>
        {calendar.map(each =>
          <th key={formatDate(each.date, 'yyyy-MM-dd')} className='date' colSpan={each.rows.length}>
            {formatDate(each.date, 'EEE, MMM dd')}
          </th>
        )}
        <td className='margin'></td>
      </tr>
    </thead>
  );
};

const calendarTableCell = (exam: Exam): JSX.Element => {
  return <>
    <strong>{exam.course + '-' + exam.section}</strong><br />
    {exam.start_time + ' - ' + exam.end_time}<br />
    {exam.building + ' ' + exam.room}
  </>;
};

const calendarTableBody = (calendar: VerticalCalendar<Exam>[]): JSX.Element => {
  return (
    <tbody>
      {calendar.map(each =>
        <tr key={'hour-' + each.hour}>
          <td className='dummy'></td>
          {each.hour === Math.floor(each.hour) && <td className='hour' rowSpan={2}>{each.hour}</td>}
          {each.values.map((item, index) =>
            <td key={'column-' + index} className={item.value ? 'cell' : 'gap'} rowSpan={item.span}>
              {item.value && (item.value.deleted ?
                <del>{calendarTableCell(item.value)}</del> : calendarTableCell(item.value))}
            </td>
          )}
        </tr>
      )}
    </tbody>
  );
};

const CalendarTable: React.FC<{ hidden: boolean, calendar: Calendar<Exam>[] }> = ({ hidden, calendar }) => {
  const verticalCalendar = createVerticalCalendar(calendar, startHour, endHour, 0.5);
  return (
    <table id='calendar' className={hidden ? 'hidden' : ''}>
      {calendarTableCols(calendar)}
      {calendarTableHead(calendar)}
      {calendarTableBody(verticalCalendar)}
    </table>
  );
};

export default CalendarTable;
