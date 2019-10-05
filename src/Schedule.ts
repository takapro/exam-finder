import { CourseCode, courseCodeToString } from './CourseCode';
import { Error, makeError } from './Error';

export interface Schedule {
  title: string;
  asof: string;
  exams: Exam[];
}

export interface Exam {
  course: string;
  section: string;
  deleted: boolean;
  instructor: string;
  date: string;
  start_time: string;
  end_time: string;
  building: string;
  room: string;
}

export interface CourseExam {
  course: string;
  exams: Exam[];
}

export const makeCourseExams = (exams: Exam[]): CourseExam[] => {
  const result: CourseExam[] = [];
  let current: CourseExam | null = null;
  exams.forEach((exam) => {
    if (current === null || current.course !== exam.course) {
      current = { course: exam.course, exams: [exam] };
      result.push(current);
    } else {
      current.exams.push(exam);
    }
  });
  return result;
};

export const filterExams = (exams: Exam[], codes: CourseCode[]): [Exam[], Error[]] => {
  if (codes.length === 0) {
    return [[], []];
  }
  const match = (exam: Exam, code: CourseCode): boolean => {
    return exam.course.substr(4) === code.number &&
      (code.subject === null || exam.course.substr(0, code.subject.length) === code.subject) &&
      (code.section === null || exam.section === code.section);
  };
  const errors: Error[] = [];
  codes.forEach(code => {
    const count = exams.filter(exam => match(exam, code)).length;
    if (count === 0) {
      errors.push(makeError(true, 'Course not found: ' + courseCodeToString(code)));
    } else if (count > 1) {
      errors.push(makeError(false, 'Course is ambiguous: ' + courseCodeToString(code)));
    }
  });
  return [exams.filter(exam => codes.some(code => match(exam, code))), errors];
};
