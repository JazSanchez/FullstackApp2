import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./Context";
import Form from "./Form";


function UpdateCourse() {
  const history = useNavigate();
  const context = useContext(Context);
  const authUser = context.authenticatedUser;
  console.log(context);

  const [course, setCourse] = useState("");
  const [errors, setErrors] = useState([]);

  const submit = (e) => {
    const {id} = authUser;
    console.log(authUser);
    const course = {
      title: e.target[0].value,
      description: e.target[1].value,
      estimatedTime: e.target[2].value,
      materialsNeeded: e.target[3].value,
        userId: id
    };

    context.data
      .getCourse(course)
      .then((errors) => {
        if (errors.length) {
          setErrors({ errors });
        } else {
        //   history.push("/");
        console.log('course created')
        }
      })
      .catch((err) => {
        console.log(err);
        // history.("/error");
      });
  };

  const cancel = () => {
       history.push('/');

  };

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     addCourse(title, description)
  // };

  // const addCourse = (title, description) => {
  //      context.data.createCourse('', {
  //         title: title,
  //         description: description,
  //     })
  //     .then((response)=> {
  //         setCourse([response.data, ... course]);
  //     });
  //     setTitle('');
  //     setDescription('');
  // }

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      <Form
        cancel={cancel}
        errors={errors}
        submit={submit}
        submitButtonText="Update Course"
        elements={() => (
          <React.Fragment>
            <label htmlFor="firstName">Title</label>
            <input id="title" name="title" type="text" defaultValue="" />
            <label htmlFor="description">Desc ription</label>
            <input
              id="description"
              name="description"
              type="text"
              defaultValue=""
            />
            <label htmlFor="Estimated Time">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              defaultValue=""
            />
            <label htmlFor="Materials Needed">Materials Needed</label>
            <input
              id="materialsNeeded"
              name="materialsNeeded"
              type="text"
              defaultValue=""
            />
          </React.Fragment>
        )}
      />
      {/* <p> */}
      {/* Already have a user account? <Link to="/signin">Click here</Link> to sign in! */}
      {/* </p> */}
    </div>
  );
}
export default UpdateCourse;