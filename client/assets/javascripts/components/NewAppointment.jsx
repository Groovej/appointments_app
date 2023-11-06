import React, { useState, useRef, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { formatISO } from 'date-fns';
import * as actions from '../actions/appointments/index';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Layout from './ui/Layout'
import DatePicker from './ui/DatePicker'
import TimePicker from './ui/TimePicker'
import Alert from './ui/Alert'

function NewAppointment(props) {
  const [coachId, setCoachId] = useState('');
  const [durationError, setDurationError] = useState('');
  const [backendError, setBackendError] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const durationRef = useRef();

  useEffect(() => {
    if (!props.appointments.coaches.length) {
      props.actions.loadCoaches()
    }
  }, [props.appointments.coaches.length])

  if (!props.appointments.coaches.length) {
    return null
  }

  const handleCoachChange = ({ target }) => setCoachId(target.value);
  const onDateChange = (value) => setDate(value)
  const onTimeChange = (value) => setTime(value)

  const submitForm = (event) => {
    event.preventDefault();

    const darationData = durationRef.current.value.trim();

    if (!coachId) {
      setBackendError('Please select coach');
      return;
    }
    if (!date) {
      setBackendError('Please enter a date');
      return
    }
    if (!time) {
      setBackendError('Please enter the time.');
      return;
    }

    if (!darationData) {
      setDurationError('This filed is required.')
    }

    if (coachId && date && time && darationData) {
      const newDate = formatISO(date, {representation: 'date'});
      const newTime = formatISO(time, {representation: 'time'});
      const dateTime = `${newDate}T${newTime}`

      props.actions.createAppointment({
        coachId,
        dateTime,
        duration: darationData,
        callback: setBackendError,
      });
    }
  };

  const { coaches } = props.appointments

  return (
    <>
      <Layout>
        {backendError && (
          <Alert open={!!backendError} errorText={backendError} />
        )}
        <h2> Add new Session </h2>
        <Grid container spacing={4}>
          <Grid item container>
            <Grid item xs={4} >
              <FormControl fullWidth>
                <InputLabel id="select-label">Coach *</InputLabel>
                <Select
                  labelId="select-label"
                  id="simple-select"
                  value={coachId}
                  label="Coach *"
                  onChange={handleCoachChange}
                >
                  {coaches.map((coach) => (
                    <MenuItem value={coach.hash_id}>
                      {`${coach.first_name} ${coach.last_name}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid item container>
            <Grid item xs={4} >
              <DatePicker setDate={onDateChange} />
            </Grid>
          </Grid>

          <Grid item container>
            <Grid item xs={4} >
              <TimePicker setTime={onTimeChange} />
            </Grid>
          </Grid>

          <Grid item container>
            <Grid item xs={4} >
              <TextField
                required
                type="number"
                fullWidth
                error={!!durationError}
                label="Duration"
                placeholder="Choose duration"
                inputRef={durationRef}
                helperText={durationError}
              />
            </Grid>
          </Grid>

          <Grid item>
            <Button variant='contained' onClick={submitForm}>Book</Button>
          </Grid>
        </Grid>

      </Layout>
    </>
  );
}

const mapStateToProps = state => {
  return {
    appointments: state.application
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewAppointment);
