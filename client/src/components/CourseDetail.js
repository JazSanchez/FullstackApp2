import React, { useState, useContext } from "react";
import { Context } from "./Context";
import { useNavigate, Link, useParams } from "react-router-dom";
import Form from "./Form";
// import axios from 'axios';
// import ReactMarkdown from "react-markdown";

export default function CourseDetail() {
  const history = useNavigate();
  const context = useContext(Context);
  const authUser = context.authenticatedUser;
  console.log(context);

  const [id, setId] = useState(2);

  const [course, setCourse] = useState([id]);
  const [errors, setErrors] = useState([]);

  const submit = (e) => {
    const emailAddress = authUser.emailAddress;
      const password = authUser.password;
    const id = {
      title: e.target[0].value,
      description: e.target[1].value,
      estimatedTime: e.target[2].value,
      materialsNeeded: e.target[3].value,
      userId: id,
    };

    context.data
      .getCourse(id, emailAddress,password)
      .then(res => {
        setCourse(res)
        console.log(res)
      })
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

 

   const delCourse = (id) => {
    const emailAddress = authUser.emailAddress
    const password = authUser.password
        context.data
      .deleteCourse(id, emailAddress, password)
      .then((errors) => {
        if (errors.length) {
          setErrors({ errors });
        } else {
          // history("/");
          console.log("course deleted");
        }
      })
      .catch((err) => {
        console.log(err);
        history("/notfound");
      });

   }

  const cancel = () => {
    history("/");
  };

  return (
    <main>
      <div className="action--bar">
        <div className="wrap">
          <Link className="button" to="">
            Update Course
          </Link>
          <Link className="button" to="/" onChange={delCourse}>
            Delete Course
          </Link>
          <Link className="button button-secondary" to="/">
            Return to List
          </Link>
        </div>
      </div>
      <div className="wrap">
        <h2>Course Detail</h2>
        <Form
          cancel={cancel}
          errors={errors}
          submit={submit}
          submitButtonText="Update Course"
          elements={() => (
            <React.Fragment>
              <div className="main--flex">
                <div>
                  <label htmlFor="title"></label>
                  <h4 className="course--name"></h4>
                  <p>By</p>
                  <p></p>
                </div>
                <div>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <p>{course.estimatedTime}</p>

                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ul className="course--detail--list">
                    <li>{course.materialsNeeded}</li>
                  </ul>
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    </main>
  );
}
