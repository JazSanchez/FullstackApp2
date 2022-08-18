//import dependencies
import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import Form from './Form';


//Created a class component named UserSignIN
export default class UserSignIn extends Component {
  
  
  // stored the initial state of properties 
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {

    // added this.state to the properties
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="form--centered">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="User Name" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />                
              </React.Fragment>
            )} 
            /> 
          
          <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
        </div>
      </div>
    );
  }

  //A change event that listened for any cahnges made to state
  change = (event) => {
    const name = event.target.name;// The change in name was stored in a variable named name
    const value = event.target.value;// The change in name was stored in a variable named name


    //The returened state
    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  //The submit function is where the context action was gathered and where it showed if the submission was successful or there was an error
  submit = () => {
    const { context } = this.props;
    // const { from } = this.props.location.state || { from: { pathname: '/authenticated' } };
    const { emailAddress, password } = this.state;

    context.actions.signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          this.setState(() => {
            return { errors: [ 'Sign-in was unsuccessful' ] };
          });
        } else {
          this.props.history.push('/');
          console.log(`Registered ${emailAddress}`)
        }
      })
      .catch((error) => {
        console.error(error);
        this.props.history.push('/error');
      });
  }

  //The cancel function redirects the users back to the main page 
  cancel = () => {
    this.props.history.push('/');
  }
}