import React from 'react';

export interface Segment {
  title: string;
  value: string;
}

interface SegmentedControlProps {
  segments: Segment[];
  value: string;
  onChange: (value: string) => void;
}

const segmentElement = (segment: Segment, value: string, onChange: (value: string) => void): JSX.Element => {
  const className = 'segment' + (segment.value === value ? ' selected' : '');
  const onClick = (): void => onChange(segment.value);
  return <div key={segment.value} className={className} onClick={onClick}>{segment.title}</div>;
};

const SegmentedControl = (props: SegmentedControlProps): JSX.Element => {
  return (
    <div className='segmentedControl'>
      {props.segments.map(segment => segmentElement(segment, props.value, props.onChange))}
    </div>
  );
};

export default SegmentedControl;
