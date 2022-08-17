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


  const [course, setCourse] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMAterialsNeeded] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    context.data
      .getSingleCourse(id)
      .then( course => {
        setTitle(course.title)
        setDescription(course.description)
        setEstimatedTime(course.estimatedTime)
        setMAterialsNeeded(course.materialsNeeded)
        setFirstName(course.firstName)
        setLastName(course.lastName)
     
      })
      .catch((err) => {
        console.log(err);
      });
  });



  const submit = () => {
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

    context.data
      .updateCourse(course, id, emailAddress, password)
      .then((res) => {
        console.log(res);
      })
      .then((errors) => {
        if (errors.length) {
          setErrors({ errors });
        } else {
          history.push("/");
          console.log("course updated");
        }
      })
      .catch(() => {
        history.push("/");
      });
  };

  const change = (event) => {
    const value = event.target.value;
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
                    defaultValue={title}
                    onChange={change}
                  />

                  <p>
                    {`By ${course.firstName} ${course.lastName}`}
                  </p>

                  <label htmlFor="description">Course Description</label>
                  <textarea
                    id="description"
                    name="description"
                    defaultValue={description}
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
