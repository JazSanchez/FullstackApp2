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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMAterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);

const change = (e) =>{
  const value = e.target.value;
  switch(e.target.name){
    case "title":
      setTitle(value);
      break;
    case "description":
      setDescription(value);
      break;
    case "estimatedTime":
      setEstimatedTime(value);
      break;
      case "materialsNeeded":
        setMAterialsNeeded(value);
        break;
    default:
      return;
  }
}



  const submit = (e) => {
   const emailAddress = authUser.emailAddress
   const password = authUser.password
 
    // const course = {
    //   title: e.target[0].value,
    //   description: e.target[1].value,
    //   estimatedTime: e.target[2].value,
    //   materialsNeeded: e.target[3].value,
    //     userId: ''
    // };

    context.data
      .createCourse(emailAddress, password, course)
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
        // history("/error");
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
            <input id="title" name="title" type="text" value={title} onChange={change} />
            <p></p>
            <label htmlFor='description'>Course Description</label>
            <textarea id='description' name="description" value={description} onChange={change}/>
          </div>
          <div>
            <label htmlFor="estimatatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={estimatatedTime}
              onChange={change}
            />
            <label htmlFor="Materials Needed">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              type="text"
              value={materialsNeeded}
              onChange={change}
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
