import React, { useState } from 'react';
import parseDate from 'date-fns/parse';
import { parseCourseCodes } from './CourseCode';
import { Exam, Schedule, filterExams } from './Schedule';
import { createCalendar } from './Calendar';
import { makeInfo } from './Error';
import InputField from './InputField';
import SegmentedControl from './SegmentedControl';
import ScheduleTable from './ScheduleTable';
import CalendarTable from './CalendarTable';

const segments = [
  { title: 'Schedule', value: 'schedule' },
  { title: 'Calendar', value: 'calendar' }
];

const createTables = (exams: Exam[]): JSX.Element => {
  const calendar = createCalendar(exams.map(exam => ({
    start: parseDate(exam.date + ' ' + exam.start_time, 'EEE, MMM d, yyyy H:mm', new Date()),
    end: parseDate(exam.date + ' ' + exam.end_time, 'EEE, MMM d, yyyy H:mm', new Date()),
    value: exam
  })));
  return <>
    <ScheduleTable exams={exams} />
    <CalendarTable calendar={calendar} />
  </>;
};

const Main = (props: { schedule: Schedule }): JSX.Element => {
  const [courseInput, setCourseInput] = useState('');
  const [segment, setSegment] = useState('schedule');
  const [codes, errors1] = parseCourseCodes(courseInput);
  const [exams, errors2] = filterExams(props.schedule.exams, codes);
  const errors = (errors1.length > 0 || errors2.length > 0) ?
    errors1.concat(errors2) : [makeInfo('Enter your courses separeted by space or comma.')];
  return <>
    <h3>{props.schedule.title}</h3>
    <p>{props.schedule.asof}</p>
    <InputField label='Courses' value={courseInput} errors={errors} onChange={setCourseInput} />
    <SegmentedControl segments={segments} value={segment} onChange={setSegment} />
    {exams.length > 0 && createTables(exams)}
  </>;
};

export default Main;
