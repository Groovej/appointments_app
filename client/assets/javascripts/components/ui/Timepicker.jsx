import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function TimePickerComponent(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker
          label="Select time *"
          onChange={(newValue) => props.setTime(newValue)}
          minTime={new Date(0, 0, 0, 8)}
          maxTime={new Date(0, 0, 0, 19, 0)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
