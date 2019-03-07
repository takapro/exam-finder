import React from 'react';
import { Error } from './Error';

interface InputFieldProps {
  label: string;
  value: string;
  errors: Error[];
  onChange: (value: string) => void;
}

const InputErrors = (props: { errors: Error[] }): JSX.Element | null => {
  if (props.errors.length === 0) {
    return null;
  }
  return (
    <div className='errors'>
      {props.errors.flatMap((error, index) => [
        <span key={'error-' + index} className={error.severity}>{error.message}</span>,
        <br key={'br-' + index} />
      ]).slice(0, -1)}
    </div>
  );
};

const InputField = (props: InputFieldProps): JSX.Element => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.onChange(event.target.value);
  };
  return (
    <div className='inputField'>
      <label>
        {props.label}<br />
        <input type='text' value={props.value} onChange={onChange} />
      </label>
      <InputErrors errors={props.errors} />
    </div>
  );
};

export default InputField;
