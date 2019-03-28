import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";


import {updateObject,checkValidity} from '../shared/utility'
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsValid: false,
      loginForm:{
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
   let submitBtn =  document.getElementById('submitBtn')
    submitBtn.disabled = true;
    submitBtn.innerText = 'Please wait...'
    const data = {
      email:this.state.loginForm.email.value,
      password:this.state.loginForm.password.value
    }
    console.log(data);
    fetch('http://localhost:3001/user/login',{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      mode:"cors",
      body:JSON.stringify(data)
    }).then(res => res.json())
    .then(data => {console.log(data)
      submitBtn.disabled = false;
      submitBtn.innerText = 'Ready!'
    })
    .catch(err => {console.log(err)
      submitBtn.disabled = false;
      submitBtn.innerText = 'Ready!'
    })
  }
  render() {

    return (
      <>
        <div className="content">
          <Row className="p-3">
            <Col md="12">
              <Card>
                <CardHeader className="text-center">
                  <h5 className="title">
                    <CardText>
                      SignIn
                  </CardText>
                  </h5>
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="tim-icons icon-single-02" />
                  </Button>
                </CardHeader>
                <CardBody className="mt-4">
                  <Form onSubmit={this.handleSubmit}>
                    <Row>

                      <Col className="pl-md-1" md="12">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input onChange={(e,field = 'email') => this.handleInputChange(e,field)} placeholder="mike@email.com" type="email" />
                        </FormGroup>
                      </Col>

                      <Col className="pl-md-1" md="12">
                        <FormGroup>
                          <label htmlFor="Password">
                            Password
                          </label>
                          <Input onChange={(e, field = 'password') => this.handleInputChange(e, field)}  placeholder="" type="Password" />
                        </FormGroup>
                      </Col>


                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button  id="submitBtn" onClick={this.handleSubmit} className="btn-fill" color="success" type="submit">
                    Ready!
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Login;
