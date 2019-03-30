import React from "react";
import { createBrowserHistory } from "history";
import {
  // withRouter,
  Router,
  Route,
  Switch,
  // Redirect
} from "react-router-dom";
// import {connect} from 'react-redux';

// import * as actions from './store/actions/index';
import AdminLayout from "layouts/Admin/Admin.jsx";
import Login from "./views/Login.jsx"
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "assets/css/iziToast.min.css"


class App extends React.Component {

  componentWillMount() {
    // this.props.onTryAutoSignup();
  }
  render(){

const hist = createBrowserHistory();
return (

    <Router history={hist}>
     <Switch>
    <Route path="/admin/dashboard"
     render={props => <AdminLayout {...props} />} />
      <Route exact path="/auth/signin"
       render={props => <Login {...props} />} />
    </Switch>
    </Router>
    )
  };
}
// const mapStateToProps = state => {
//   return {
//     isAutheticated: state.auth.auth
//   }
// }

// const matchDispatchToProps = (dispatch) => {
//   return {
//     onTryAutoSignup: () => dispatch(actions.authCheckState())
//   };
// };
export default App;
// export default withRouter(connect(mapStateToProps, matchDispatchToProps)(App));
