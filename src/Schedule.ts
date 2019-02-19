export interface Schedule {
  name: string;
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
