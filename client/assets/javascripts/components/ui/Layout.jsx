import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from '../../actions/appointments/index';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Menu from './Menu'

const BoxContainer = styled('div')(({ theme }) => ({
  backgroundColor: '#cfe8fc',
  padding: '30px',
  height: '100%',
}));

function Layout(props) {
  useEffect(() => {
    if (!Object.keys(props.appointments.user).length) {
      props.actions.loadUser()
    }
  }, [])

  if (!Object.keys(props.appointments.user).length) {
    return null
  }

  const { user } = props.appointments
  const userName = `${user.firstName} ${user.lastName}`

  return(
    <Container fixed>
      <BoxContainer>
        <Menu name={userName} actions={props.actions} role={user.role} />
        {props.children}
      </BoxContainer>
    </Container>
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
)(Layout);
