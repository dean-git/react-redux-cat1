import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { getUser } from "./connect/loginActions";
import cookiejs from 'cookiejs';
import { Redirect } from 'react-router-dom';
import spinner from '../data/ZZ5H.gif';
import { isEmpty } from 'lodash';
//import isEmpty from 'react-lodash/lib/IsEmpty';

const initialState = {
  email: '',
  password: '',
  submitted: false,
  toProducts: false
};

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    console.log("component will mount...");
    cookiejs.remove('user-auth');
}

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.email && this.state.password) {
      console.log('auth submitted');
      this.setState({ submitted: true });
      this.props.dispatch(getUser()).then(() => this.setState(() => ({ toProducts: true })));
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  render() {
    const { error, loading, user } = this.props;

    if (!isEmpty(user)) {
      // Setting auth token.  This would normally be obtained from backend security api, 
      // be encrypted with an expiration.
      cookiejs.set('user-auth', user.authenticated, { path: '/' });
      if (this.state.toProducts) {
        return <Redirect to='/products' />
      }
    }

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div className="loader"><img src={spinner} alt="loading..." className="loader-img"/></div>;
    }

    return (
      <div className="login-wrapper">
        <Container className="login-container">
          <Row className="justify-content-md-center">
            <Col md={6}>
              <div className="login-title">
                <h1>Product Category App</h1>
              </div>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                  <FormLabel>Email</FormLabel>
                  <FormControl
                    autoFocus
                    type="email"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                  <FormLabel>Password</FormLabel>
                  <FormControl
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    type="password"
                  />
                </FormGroup>
                <Button block bsSize="large" disabled={!this.validateForm} type="submit">
                  Login
                    </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.items,
  loading: state.user.loading,
  error: state.user.error
});

export default connect(mapStateToProps)(Login);
//connect(mapStateToProps)(ProductList);