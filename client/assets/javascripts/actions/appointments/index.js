import "whatwg-fetch";
import { push } from "react-router-redux";

let currentUserToken;
document.addEventListener("DOMContentLoaded", () => {
  currentUserToken = document.querySelector('meta[name="csrf-token"]').content;
});

const loadAppointments = filters => {
  return dispatch => {
    fetch('/imcoming', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": currentUserToken
      }
    })
      .catch(response => dispatch({ type: "REQUEST_FAILED" }))
      .then(response => response.json())
      .then((data) => {
        if (data) {
          dispatch({
            type: "REQUEST_SUCCEEDED",
            payload: data
          });
        } else {
          dispatch({
            type: "REQUEST_FAILED",
            payload: { errorMessage: "Something went wront. Please try later" }
          });
        }
      });
  };
};

const loadUser = () => {
  return dispatch => {
    fetch('/user', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": currentUserToken
      }
    })
      .catch(response => dispatch({ type: "REQUEST_FAILED" }))
      .then(response => response.json())
      .then((data) => {
        if (data) {
          dispatch({
            type: "REQUEST_SUCCEEDED",
            payload: data
          });
        } else {
          dispatch({
            type: "REQUEST_FAILED",
            payload: { errorMessage: "Something went wront. Please try later" }
          });
        }
      });
  };
};

const login = ({ email, password, callback }) => {
  return dispatch => {
    fetch('/sign_in', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": currentUserToken,
        'Accept': 'application/json',
      },
      credentials: "same-origin",
      body: JSON.stringify({ authenticity_token: currentUserToken,  user: { email, password } })
    })
      .catch(response => { callback('Something went wrong, please contact support!')})
      .then(response => response.json())
      .then(data => {
        if (!data.success) {
          callback(`Something went wrong, please contact support! ${data.error}`)
          return false
        }

        dispatch({
          type: "SET_USER_DATA",
          payload: data.user
        });
        dispatch(push("/dashboard"));
      });
  };
};

const logout = () => {
  return dispatch => {
    fetch('/sign_out', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": currentUserToken,
        'Accept': 'application/json',
      },
      credentials: "same-origin",
    })
      .catch(response => { callback('Something went wrong, please contact support!')})
      .then(response => response.json())
      .then(data => {
        if (!data.success) {
          dispatch({
            type: "REQUEST_FAILED",
            payload: { errorMessage: "Something went wront. Please try later" }
          });
          return false
        }

        dispatch({ type: "CLEAR_USER_DATA"});
        dispatch(push("/sign_in"));
      });
  };
};

const createAppointment = ({ coachId, dateTime, duration, callback }) => {
  return dispatch => {
    fetch('/appointment', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": currentUserToken,
        'Accept': 'application/json',
      },
      credentials: "same-origin",
      body: JSON.stringify({ appointment: { coach_id: coachId, datetime: dateTime, duration } })
    })
      .catch(response => { callback('Something went wrong, please contact support!')})
      .then(response => response.json())
      .then(data => {
        if (!data.success) {
          callback('This session can not be booked. Choose another time or date.')
          return false
        }

        dispatch({
          type: "ADD_NEW_APPOINTMENT",
          payload: { appointment: data.appointment }
        });

        dispatch(push("/dashboard"));
      });
  };
};


const changeNewLocation = (path) => {
  return dispatch => dispatch(push(path));
}

const loadCoaches = () => {
  return dispatch => {
    fetch('/coaches', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": currentUserToken
      }
    })
      .catch(response => dispatch({ type: "REQUEST_FAILED" }))
      .then(response => response.json())
      .then((data) => {
        if (data) {
          dispatch({
            type: "REQUEST_SUCCEEDED",
            payload: data
          });
        } else {
          dispatch({
            type: "REQUEST_FAILED",
            payload: { errorMessage: "Something went wront. Please try later" }
          });
        }
      });
  };
};

export {
  loadAppointments,
  login,
  logout,
  loadUser,
  createAppointment,
  changeNewLocation,
  loadCoaches
};
