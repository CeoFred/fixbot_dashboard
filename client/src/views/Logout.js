import React from 'react';

import {connect} from "react-redux";
import {withRouter,Redirect} from "react-router-dom";

import * as actions from "../store/actions/"

class Logout extends React.Component {
  componentWillMount(){
    this.props.logout();
  }
  render(){
    return(
<Redirect to="/"/>
    )
  }
}
const matchDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default withRouter(connect(null, matchDispatchToProps)(Logout));