//import all required dependencies
import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Context } from "./Context";
import Form from "./Form";


//Created a functional component that updates a course
function UpdateCourse() {
  let history = useHistory();//Created a variable using the useHistory 
  const context = useContext(Context);// Created a variable for the Context imported
  const authUser = context.authenticatedUser;//

//Created State properties
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMAterialsNeeded] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState([]);
  const { id } = useParams();



    //useEffect to fetch the data from the context.data.getSingleCourse which is a function in the data.js that retrieves the data from the url endpoint
  useEffect(() => {
    context.data
      .getSingleCourse(id)
      // In the .then I took in all the needed properties
      .then( course => {
        setTitle(course.title)
        setDescription(course.description)
        setEstimatedTime(course.estimatedTime)
        setMAterialsNeeded(course.materialsNeeded)
        setFirstName(course.User.firstName)
        setLastName(course.User.lastName)
     
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, errors]);


//// Created a variable named submit that upon submission makes a PUT request 
  const submit = () => {
    //Variables that store what needs to be passed into the updateCourse function
    const emailAddress = authUser.emailAddress;
    const password = authUser.password;
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      firstName,
      lastName
    };

    // Used the context.data gathered from the context component which got the data from datat.js to make a PUT request to update a course
    context.data
      .updateCourse(id, course, emailAddress, password)
      .then(res => {
        if (res.errors) {
          setErrors(res.errors)
        }
      })
      .catch(() => {
        history.push('/')
      });
  };

  // created a variable named change that takes in all the properties that may experience a change
  const change = (event) => {
    const value = event.target.value;//stored the event.target.value of any given change in a variable named value
    switch (event.target.name) {
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
        case 'firstName':
        setFirstName(value);
        break;
       case 'lastName':
         setLastName(value);
         break;
      default:
        return;
    }
  };

  // a variable that stores a function that redirects users to the main page
  const cancel = () => {
    history.push("/");
  };

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        <Form
          cancel={cancel}
          errors={errors}
          submit={submit}
          submitButtonText="Update Course"
          elements={() => (
            <React.Fragment>
              <div className="main--flex">
                <div>
                  <label htmlFor="title">Course Title</label>
                  <input
                    id="courseTitle"
                    name="title"
                    type="text"
                    value={title}
                    onChange={change}
                  />

                  <p>
                    {`By ${firstName} ${lastName}`}
                  </p>

                  <label htmlFor="description">Course Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={change}
                  />
                </div>

                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    defaultValue={estimatedTime}
                    onChange={change}
                  />
                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    defaultValue={materialsNeeded}
                    onChange={change}
                  />
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    </main>
  );
}
export default UpdateCourse;
