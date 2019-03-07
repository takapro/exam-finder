import { Course, courseToString } from './Course';
import { Error, makeError } from './Error';

export interface Schedule {
  title: string;
  asof: string;
  exams: Exam[];
}

export interface Exam {
  course: string;
  section: string;
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

export const filterExams = (exams: Exam[], courses: Course[]): [Exam[], Error[]] => {
  if (courses.length === 0) {
    return [[], []];
  }
  const match = (exam: Exam, course: Course): boolean => {
    return exam.course.substr(4) === course.number &&
      (course.subject === null || exam.course.substr(0, course.subject.length) === course.subject) &&
      (course.section === null || exam.section === course.section);
  };
  const errors: Error[] = [];
  courses.forEach(course => {
    let count = exams.filter(exam => match(exam, course)).length;
    if (count === 0) {
      errors.push(makeError(true, 'Course not found: ' + courseToString(course)));
    } else if (count > 1) {
      errors.push(makeError(false, 'Course is ambiguous: ' + courseToString(course)));
    }
  });
  return [exams.filter(exam => courses.some(course => match(exam, course))), errors];
};
