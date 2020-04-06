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

const createTables = (exams: Exam[], segment: string, setSegment: (value: string) => void): JSX.Element => {
  const calendar = createCalendar(exams.map(exam => ({
    start: parseDate(exam.date + ' ' + exam.start_time, 'EEE, MMM d, yyyy H:mm', new Date()),
    end: parseDate(exam.date + ' ' + exam.end_time, 'EEE, MMM d, yyyy H:mm', new Date()),
    value: exam
  })), true);
  return <>
    <SegmentedControl segments={segments} value={segment} onChange={setSegment} />
    <ScheduleTable hidden={segment !== 'schedule'} exams={exams} />
    <CalendarTable hidden={segment !== 'calendar'} calendar={calendar} />
  </>;
};

const Main: React.FC<{ schedule: Schedule }> = ({ schedule }) => {
  const [courseInput, setCourseInput] = useState('');
  const [segment, setSegment] = useState('schedule');
  const [codes, errors1] = parseCourseCodes(courseInput);
  const [exams, errors2] = filterExams(schedule.exams, codes);
  const errors = (errors1.length > 0 || errors2.length > 0) ?
    errors1.concat(errors2) : [makeInfo('Enter your courses separeted by space or comma.')];
  return <>
    <h3>{schedule.title}</h3>
    <p>{schedule.asof}</p>
    {schedule.notices?.map((each, index) => <p key={index}>{each}</p>)}
    <InputField label='Courses' value={courseInput} errors={errors} onChange={setCourseInput} />
    {exams.length > 0 && createTables(exams, segment, setSegment)}
  </>;
};

export default Main;
