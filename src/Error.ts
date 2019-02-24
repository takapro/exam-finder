type Severity = 'error' | 'warning' | 'info';

export interface Error {
  severity: Severity;
  message: string;
}

export const makeError = (isError: boolean, message: string): Error => {
  return { severity: isError ? 'error' : 'warning', message: message };
};

export const makeInfo = (message: string): Error => {
  return { severity: 'info', message: message };
};
