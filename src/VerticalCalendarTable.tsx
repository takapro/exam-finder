import React from 'react';
import formatDate from 'date-fns/format';
import parseDate from 'date-fns/parse';
import { Calendar, CalendarItem, VerticalCalendar, createCalendar, createVerticalCalendar } from './Calendar';
import { Exam } from './Schedule';

const startHour = 8;
const endHour = 22;

const VerticalCalendarTableHead = (props: { calendar: Calendar<Exam>[] }): JSX.Element => {
  return (
    <thead>
      <tr>
        <th></th>
        {props.calendar.map(each =>
          <td key={formatDate(each.date, 'yyyy-MM-dd')} className='date' colSpan={each.rows.length}>
            {formatDate(each.date, 'EEE, MMM dd')}
          </td>
        )}
      </tr>
    </thead>
  );
};

const VerticalCalendarTableBody = (props: { calendar: VerticalCalendar<Exam>[] }): JSX.Element => {
  return (
    <tbody>
      {props.calendar.map(each =>
        <tr key={'hour-' + each.hour}>
          {each.hour === Math.floor(each.hour) && <th className='hour' rowSpan={2}>{each.hour}</th>}
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

const VerticalCalendarTable = (props: { exams: Exam[] }): JSX.Element => {
  const items: CalendarItem<Exam>[] = props.exams.map(exam => ({
    start: parseDate(exam.date + ' ' + exam.start_time, 'EEE, MMM d, yyyy H:mm', new Date()),
    end: parseDate(exam.date + ' ' + exam.end_time, 'EEE, MMM d, yyyy H:mm', new Date()),
    value: exam
  }));
  const calendar = createCalendar(items);
  const verticalCalendar = createVerticalCalendar(calendar, startHour, endHour, 0.5);
  return (
    <table id='verticalCalendar'>
      <colgroup>
        <col className='hour' />
        {calendar.flatMap(each => each.rows.map((_, index) =>
          <col key={formatDate(each.date, 'yyyy-MM-dd') + '-' + index} className={index === 0 ? 'first' : 'not_first'}/>
        ))}
      </colgroup>
      <VerticalCalendarTableHead calendar={calendar} />
      <VerticalCalendarTableBody calendar={verticalCalendar} />
    </table>
  );
};

export default VerticalCalendarTable;
