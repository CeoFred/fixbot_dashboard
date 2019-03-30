import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  // CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import { updateObject, checkValidity } from '../shared/utility'

import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom'
import * as actions from '../store/actions/index'
import "../assets/css/custom.css"
// import {
//   withRouter
// } from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsValid: false,
      loginForm: {
        email: {
          value: '',
          validation: {
            required: true,
            isEmail: true

          },
          valid: false,
          touched: false,
        },
        password: {
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
      }
    }
  }
  componentWillMount() {
    document.title = 'Login | fixbot'
    if(this.props.isAutheticated){
      this.props.history.push('/');
    }
  }

  handleInputChange = (event, inputIdentifier) => {

    const updatedFormElement = updateObject(this.state.loginForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.loginForm[inputIdentifier].validation),
      touched: true
    });
    // console.log(updatedFormElement)

    const updatedLoginForm = updateObject(this.state.loginForm, {
      [inputIdentifier]: updatedFormElement
    })

    let formisValid = true;
    for (let inputIdentifier in updatedLoginForm) {
      // console.log(updatedLoginForm);
      formisValid = updatedLoginForm[inputIdentifier].valid && formisValid
    }
    this.setState({ loginForm: updatedLoginForm, formIsValid: formisValid });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let submitBtn = document.getElementById('submitBtn')
    submitBtn.disabled = true;
    submitBtn.innerText = 'Please wait...'
    const email = this.state.loginForm.email.value
    const password = this.state.loginForm.password.value
    this.props.SignIn(email, password, false)

    setTimeout(() => {

      if (this.props.isAutheticated) {

        var options = {}
        let place = "tr"
        let type = "success"
        options = {
          place: place,
          message: (
            <div>
              <div>
               Success
          </div>
            </div>
          ),
          type: type,
          icon: "tim-icons icon-bell-55",
          autoDismiss: 3
        };
        this.refs.notificationAlert.notificationAlert(options);
        setTimeout(() => {
          this.props.history.push('/admin/dashboard');
        }, 3000);
      }

      if (this.props.loading === false) {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Ready!'
      }

      if (this.props.error) {

        let place = "tr"
        let type = "warning"
        options = {
          place: place,
          message: (
            <div>
              <div>
                Failed to Authenticate
          </div>
            </div>
          ),
          type: type,
          icon: "tim-icons icon-bell-55",
          autoDismiss: 7
        };
        this.refs.notificationAlert.notificationAlert(options);

      }
    }, 1000)
  }

  render() {
    return (
      <>

        <div className="content">
          <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
          <Row>
            <Col>
              <Card>
                <CardHeader className="text-center">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="tim-icons icon-single-02" />
                  </Button>
                </CardHeader>
                <CardBody className="mt-4">
                  <Form onSubmit={this.handleSubmit}>
                    <Row className="p-4">
                      <Col className="pl-md-1" md="12">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input onChange={(e, field = 'email') => this.handleInputChange(e, field)} placeholder="mike@email.com" type="email" />
                        </FormGroup>
                      </Col>

                      <Col className="pl-md-1" md="12">
                        <FormGroup>
                          <label htmlFor="Password">
                            Password
                          </label>
                          <Input onChange={(e, field = 'password') => this.handleInputChange(e, field)} placeholder="" type="Password" />
                        </FormGroup>
                      </Col>
                      <Button id="submitBtn" onClick={this.handleSubmit} className="btn-fill" color="success" type="submit">
                        Ready!
                  </Button>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>

                </CardFooter>
              </Card>
            </Col>
          </Row>
      </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAutheticated: state.auth.token !== null,
    loading: state.auth.loading,
    token: state.auth.token,
    error: state.auth.errorMessage !== null
  }
}

const matchDispatchToProps = (dispatch) => {
  return {
    SignIn: (email, password, bool) => dispatch(actions.auth(email, password, bool))
  };
};

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Login));


// export default Login;
