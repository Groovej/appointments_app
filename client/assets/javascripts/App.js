import React from "react";
import { render } from "react-dom";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import SignInComponent from "./components/SignInComponent";
import DashboardComponent from "./components/DashboardComponent";
import NewAppointment from "./components/NewAppointment";
import history from "./utils/history";

const initializeApplication = () => {
  const store = configureStore();

  render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/sign_in"
            component={SignInComponent}
          />
          <Route
            exact
            path="/dashboard"
            component={DashboardComponent}
          />
          <Route
            exact
            path="/new"
            component={NewAppointment}
          />
        </Switch>
      </Router>
    </Provider>,
    document.querySelector("#application-root")
  );
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#application-root") && initializeApplication();
});
