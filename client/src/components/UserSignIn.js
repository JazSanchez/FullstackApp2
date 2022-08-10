import React, { setContext } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import { Context } from './Context';

export default function UserSignIn()  {
  const context = useContext(Context)
  let history = useNavigate()
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [errors, setErrors] = useState([]);

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;


  const submit = () => {
    const { username, password } = state;

    context.actions.signIn(username, password)
      .then((user) => {
        if (user === null) {
          setErrors(() => {
            return { errors: [ 'Sign-in was unsuccessful' ] };
          });
        } else {
          history.push(from);
        }
      })
      .catch((error) => {
        console.error(error);
        history.push('/error');
      });
  }

 const cancel = () => {
    history.push('/');
  }


    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form 
            cancel={cancel}
            errors={errors}
            submit={submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input 
                  id="username" 
                  name="username" 
                  type="text"
                  value={username} 
                  onChange={change} 
                  placeholder="User Name" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={change} 
                  placeholder="Password" />                
              </React.Fragment>
            )} 
            /> 
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
      </div>
    );
  }

  
}