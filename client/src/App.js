import React from "react";
import {
  withRouter,
  Redirect,
  Route,
  Switch,
  // Redirect
} from "react-router-dom";
import {connect} from 'react-redux';

import * as actions from './store/actions/index';
import AdminLayout from "layouts/Admin/Admin.jsx";
import Login from "./views/Login.jsx"

class App extends React.Component {

  componentWillMount() {
    this.props.onTryAutoSignup();
  }
  render(){
return (
<Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
    <Route path="/auth/login" exact render={props => <Login {...props}/>} />

      <Redirect from="/" to="/admin/dashboard" />
     </Switch>
    )
  };
}
const mapStateToProps = state => {
  return {
    isAutheticated: state.auth.auth
  }
}

const matchDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(App));
