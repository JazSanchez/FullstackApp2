// Imported Dependencies
import React from "react";
import { Link } from "react-router-dom";

// Created a class component named Header
export default class Header extends React.PureComponent {
  render() {
    //Imported context and authenticatedUser
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <Link to="/">Courses </Link>
          </h1>
          <nav>
            {/*If the user is authenticated thw users name will render in the header saying welcome*/}
            {authUser ? (
              <React.Fragment>
                <ul className="header--signedin">
                  <span>Welcome, {authUser.firstName}!</span>
                 <li> <Link className="signout" to="/signout">
                    Sign Out
                  </Link></li>
                </ul>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <ul className="header--signedout">
                <li> <Link className="signup" to="/signup">
                    Sign Up
                  </Link></li> 

              <li>    <Link className="signin" to="/signin">
                    Sign In
                  </Link></li>
                </ul>
              </React.Fragment>
            )}
            {/*If the user is not authenticated the user SignUp and SignIn will render*/}
          </nav>
        </div>
      </header>
    );
  }
}
