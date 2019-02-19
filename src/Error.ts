type Severity = 'error' | 'warning';

export interface Error {
  severity: Severity;
  message: string;
}

export const makeError = (isError: boolean, message: string): Error => {
  return { severity: isError ? 'error' : 'warning', message: message };
};
