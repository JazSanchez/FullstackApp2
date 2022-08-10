import React from "react";
import { Link } from "react-router-dom";
import { Context } from "./Context";

export default function Header() {

    // const context = useContext(Context);
    // const authUser = context.authenticateUser;
    return (

    // const context = useContext(Context);
    // const authUser = context.authenticateUser;
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <a href="/courses">Courses</a>
          </h1>
          <nav>
            {authUser ? (
              <React.Fragment>
                <span>Welcome, {authUser.name}!</span>

                <Link>
                  <a href="/signout">Sign Out</a>
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className="signup">
                  <a href="/signup">Sign Up</a>
                </Link>
                <Link className="signin">
                  <a href="/signin">Sign In</a>
                </Link>
              </React.Fragment>
            )}
          </nav>
        </div>
      </header>
    );
  }

