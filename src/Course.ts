import { Error, makeError } from './Error';

export interface Course {
  subject: string | null;
  number: string;
  section: string | null;
}

export const courseToString = (course: Course): string => {
  const { subject, number, section } = course;
  return (subject !== null ? subject : '') + number + (section !== null ? '-' + section : '');
};

export const parseCourses = (input: string): [Course[], Error[]] => {
  const result: Course[] = [];
  let subject: string | null = null;
  let current: Course | null = null;
  const split = input.match(/([A-Za-z]+|[0-9]+)/g);
  if (split !== null) {
    for (let i = 0; i < split.length; i++) {
      const each = split[i];
      if (each.match(/[A-Za-z]+/) !== null) {
        if (subject !== null) {
          return [result, [makeError(true, 'Subject has no number: ' + subject)]];
        }
        if (each.length > 4) {
          return [result, [makeError(true, 'Subject too long: ' + each.toLowerCase())]];
        }
        subject = each.toUpperCase();
        current = null;
      } else if (each.length <= 3) {
        if (current === null) {
          return [result, [makeError(i < split.length - 1, 'Incomplete number: ' + each)]];
        }
        current.section = ('00' + each).slice(-3);
        current = null;
      } else if (each.length <= 7) {
        const course = {
          subject: subject,
          number: each.substr(0, 4),
          section: each.length === 4 ? null : ('00' + each.substr(4)).slice(-3)
        };
        result.push(course);
        current = each.length === 4 ? course : null;
        subject = null;
      } else {
        return [result, [makeError(true, 'Number too long: ' + each)]];
      }
    }
    if (subject !== null) {
      return [result, [makeError(false, 'Subject has no number: ' + subject)]];
    }
  }
  return [result, []];
};
