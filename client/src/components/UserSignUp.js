//import dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';


//Created a class component named UserSignUp
export default class UserSignUp extends Component {

 // stored the initial state of properties 
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {

    // added this.state to the properties
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      errors,

    } = this.state;

 

    return (
      <div className="form--centered">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                 <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={this.change} />
                  <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={this.change}
                  />
                  <label htmlFor="emailAddress">Email Address</label>
                  <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={this.change}
                  />
                  <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="text"
                  value={password}
                  onChange={this.change}
                   />
              </React.Fragment>
            )} />
          <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
        </div>
      </div>
    );
  }

  //A change event that listened for any cahnges made to state
  change = (event) => {
    const name = event.target.name;// The change in name was stored in a variable named name
    const value = event.target.value;// The change in name was stored in a variable named name

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  }

   //The submit function is where the context action was gathered and where it showed if the submission was successful or there was an error
  submit = () => {
    const { context } = this.props
    const {
      firstName,
      lastName,
      emailAddress,
      password,
    } = this.state;

    // Create user
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };
    
 
    context.data.createUser(user)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          context.actions.signIn(emailAddress, password)
            .then(() => {
              console.log(`${password} ${emailAddress}`)
             
              this.props.history.push('/');
            });
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      });

  }

    //The cancel function redirects the users back to the main page 
  cancel = () => {
   this.props.history.push('/');
  }
}
