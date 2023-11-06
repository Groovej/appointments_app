import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from '../actions/appointments/index';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import Layout from './ui/Layout'
import { parseDuration } from '../helpers.js';

function DashboardComponent(props) {
  useEffect(() => {
    if (!props.appointments.data.length) {
      props.actions.loadAppointments()
    }
  }, [])

  const { coaches, data } = props.appointments

  const coachesHash = Object.fromEntries(coaches.map((coach) => {
    return [coach.hash_id, `${coach.first_name} ${coach.last_name}`]
  }))

  return(
    <Layout>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#cfe8fc' }} subheader={<ListSubheader sx={{bgcolor: '#cfe8fc', fontSize: '25px'}}>Incomming appointments:</ListSubheader>}>
        {data.length && data.map((appointment, index) => {
          const coachName = coachesHash[appointment.coach_hash_id]
          const duration = parseDuration(appointment.start, appointment.duration)
          const text = `Appointment ${index + 1} with ${coachName} ${duration}`

          return(
            <ListItem key={index}>
              <ListItemIcon>
                <CalendarMonthIcon />
                </ListItemIcon>
              <ListItemText id={`appointment-${index}`} primary={text} />
            </ListItem>
          )
        })}
        {!data.length && (
          <div> There are no appointments yet.</div>
        )}
      </List>
    </Layout>
  )
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
)(DashboardComponent);
