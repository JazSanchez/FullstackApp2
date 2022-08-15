import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "./Context";
import Form from "./Form";


function Createcourse() {

  const history = useNavigate();
  const context = useContext(Context);
  const authUser = context.authenticatedUser;
  console.log(authUser);


  const [course, setCourse] = useState("");
  const [errors, setErrors] = useState([]);


  const submit = (e) => {
    const {id, emailAddress, password} = authUser;
    console.log(authUser);
    const course = {
      title: e.target[0].value,
      description: e.target[1].value,
      estimatedTime: e.target[2].value,
      materialsNeeded: e.target[3].value,
        userId: id
    };

    context.data
      .createCourse(course, emailAddress, password)
      .then((errors) => {
        if (errors.length) {
          setErrors({ errors });
        } else {
          history("/");
        console.log('course created')
        }
      })
      .catch((err) => {
        console.log(err);
        history("/error");
      });
  };

  const cancel = () => {
       history('/');

  };


  return (
    <main>
    <div className="wrap">
      <h2>Create Course</h2>
      <Form
        cancel={cancel}
        errors={errors}
        submit={submit}
        submitButtonText="Create Course"
        elements={() => (
          <React.Fragment>
            <div className="main--flex">
              <div>
            <label htmlFor="title">Course Title</label>
            <input id="title" name="title" type="text" defaultValue="" />
            <p>By </p>
            <label htmlFor='description'>Course Description</label>
            <textarea id='description' name="description" defaultValue=""/>
          </div>
          <div>
            <label htmlFor="estimatatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              defaultValue=""
            />
            <label htmlFor="Materials Needed">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              type="text"
              defaultValue=""
            />
                 </div>
            </div>
          </React.Fragment>
        )}
      />
      <p> 
      Already have a user account? <Link to="/signin">Click here</Link> to sign in!
      </p>
    </div>
    </main>
  );
}


export default Createcourse;
