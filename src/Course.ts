export interface Course {
  subject: string | null;
  number: string;
  section: string | null;
}

export const courseToString = (course: Course): string => {
  const { subject, number, section } = course;
  return (subject !== null ? subject : '') + number + (section !== null ? '-' + section : '');
};

export const parseCourses = (input: string): [Course[], string | null] => {
  const result: Course[] = [];
  let subject: string | null = null;
  let current: Course | null = null;
  const split = input.match(/([A-Za-z]+|[0-9]+)/g);
  if (split !== null) {
    for (let i = 0; i < split.length; i++) {
      const each = split[i];
      if (each.match(/[A-Za-z]+/) !== null) {
        if (subject !== null) {
          return [result, 'Subject has no number: ' + subject];
        }
        if (each.length !== 4) {
          return [result, 'Incomplete subject: ' + each.toLowerCase()];
        }
        subject = each.toUpperCase();
        current = null;
      } else if (each.length === 7) {
        const course = {
          subject: subject,
          number: each.substr(0, 4),
          section: each.substr(4, 3)
        };
        result.push(course);
        current = null;
        subject = null;
      } else if (each.length === 4) {
        current = {
          subject: subject,
          number: each,
          section: null
        };
        result.push(current);
        subject = null;
      } else if (each.length === 3) {
        if (current === null) {
          return [result, 'Incomplete number: ' + each];
        }
        current.section = each;
        current = null;
      } else {
          return [result, 'Incomplete number: ' + each];
      }
    }
    if (subject !== null) {
      return [result, 'Subject has no number: ' + subject];
    }
  }
  return [result, null];
};
