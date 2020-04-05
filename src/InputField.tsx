import React from 'react';
import { Error } from './Error';

interface InputFieldProps {
  label: string;
  value: string;
  errors: Error[];
  onChange: (value: string) => void;
}

const InputErrors: React.FC<{ errors: Error[] }> = ({ errors }) => {
  if (errors.length === 0) {
    return null;
  }
  return (
    <div className='errors'>
      {errors.flatMap((error, index) => [
        <span key={'error-' + index} className={error.severity}>{error.message}</span>,
        <br key={'br-' + index} />
      ]).slice(0, -1)}
    </div>
  );
};

const InputField: React.FC<InputFieldProps> = ({ label, value, errors, onChange }) => {
  return (
    <div className='inputField'>
      <label>
        {label}<br />
        <input autoFocus type='text' value={value} onChange={e => onChange(e.target.value)} />
      </label>
      <InputErrors errors={errors} />
    </div>
  );
};

export default InputField;
