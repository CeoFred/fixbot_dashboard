import React from "react";
import { createBrowserHistory } from "history";
import {
  withRouter,Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import {connect} from 'react-redux';

import * as actions from './store/actions/index';
import AdminLayout from "layouts/Admin/Admin.jsx";
import Login from "./views/Login.jsx"
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";


class App extends React.Component {

  componentDidMount() {

    this.props.onTryAutoSignup();
  }
  render(){
const hist = createBrowserHistory();

let routes = (

<Router history={hist}>
<Switch>
      <Route path="/auth/signin" component={Login}/>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </Router>
    );

    return {routes}
  }

;

}
const mapStateToProps = state => {
  return {
    isAutheticated: state.auth.token !== null
  }
}

const matchDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(App));
