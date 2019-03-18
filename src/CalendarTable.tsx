import React from 'react';
import formatDate from 'date-fns/format';
import { Calendar, VerticalCalendar, createVerticalCalendar } from './Calendar';
import { Exam } from './Schedule';

const startHour = 8;
const endHour = 22;

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
      </tr>
    </thead>
  );
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
              {item.value && <>
                <strong>{item.value.course + '-' + item.value.section}</strong><br />
                {item.value.start_time + ' - ' + item.value.end_time}<br />
                {item.value.building + ' ' + item.value.room}
              </>}
            </td>
          )}
        </tr>
      )}
    </tbody>
  );
};

const CalendarTable = (props: { hidden: boolean, calendar: Calendar<Exam>[] }): JSX.Element => {
  const verticalCalendar = createVerticalCalendar(props.calendar, startHour, endHour, 0.5);
  return (
    <table id='calendar' className={props.hidden ? 'hidden' : ''}>
      <colgroup>
        <col className='dummy' />
        <col className='hour' />
        {props.calendar.flatMap(each => each.rows.map((_, index) =>
          <col key={formatDate(each.date, 'yyyy-MM-dd') + '-' + index} className={index === 0 ? 'first' : 'not_first'}/>
        ))}
      </colgroup>
      {calendarTableHead(props.calendar)}
      {calendarTableBody(verticalCalendar)}
    </table>
  );
};

export default CalendarTable;
