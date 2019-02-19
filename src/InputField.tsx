import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
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
    </div>
  );
};

export default InputField;
