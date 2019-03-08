import { Error, makeError } from './Error';

export interface CourseCode {
  subject: string | null;
  number: string;
  section: string | null;
}

export const courseCodeToString = (code: CourseCode): string => {
  const { subject, number, section } = code;
  return (subject !== null ? subject : '') + number + (section !== null ? '-' + section : '');
};

export const parseCourseCodes = (input: string): [CourseCode[], Error[]] => {
  const result: CourseCode[] = [];
  let subject: string | null = null;
  let current: CourseCode | null = null;
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
        const code = {
          subject: subject,
          number: each.substr(0, 4),
          section: each.length === 4 ? null : ('00' + each.substr(4)).slice(-3)
        };
        result.push(code);
        current = each.length === 4 ? code : null;
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
