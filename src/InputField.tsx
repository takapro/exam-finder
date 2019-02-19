import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  error: string | null;
  onChange: (value: string) => void;
}

const InputField = (props: InputFieldProps) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.onChange(event.target.value);
  };
  return (
    <div className='inputField'>
      <label>
        {props.label}<br />
        <input type='text' value={props.value} onChange={onChange} />
      </label>
      {props.error !== null && <div className='error'>{props.error}</div>}
    </div>
  );
};

export default InputField;
