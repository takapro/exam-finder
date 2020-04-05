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

const SegmentedControl: React.FC<SegmentedControlProps> = ({ segments, value, onChange }) => {
  return (
    <div className='segmentedControl'>
      {segments.map(segment => segmentElement(segment, value, onChange))}
    </div>
  );
};

export default SegmentedControl;
