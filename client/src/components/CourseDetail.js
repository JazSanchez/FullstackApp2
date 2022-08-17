//import dependencies
import React, { useState, useContext, useEffect } from "react";
import { Context } from "./Context";
import { useHistory, Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";


//Created a functional components named CourseDetail
export default function CourseDetail() {

  let history = useHistory(); //Used the useHistory and plugged it into a variable
  const context = useContext(Context);// Plugged in the useContext into a variable
  const authUser = context.authenticatedUser;//Got the authenticatedUser and plugged it into a variable
  console.log(context);


  //Created state properties
  const [course, setCourse] = useState({});
  const [user, setUser] = useState({ firstName: "", lastName:"" });
  const [errors, setErrors] = useState([]);

  //Used params for the id
  const { id } = useParams();


  //useEffect to fetch the data from the context.data.getSingleCourse which is a function in the data.js that retrieves the data from the url endpoint
  useEffect(() => {
    context.data
      .getSingleCourse(id)
      .then((res) => {//The response from the request
        console.log(res)
 
      })
      // .then((res) => {//The response from the request
      //   console.log(res);
      //   setUser(res);
      // })
      .catch((err) => {//Errors caught 
        console.log(err);
      });
  }, [id]);


  // Created a variable function to fetch the data from the context.data.deleteCourse which is a function in the data.js that retrieves the data from the url endpoint
  const delCourse = () => {
    const emailAddress = authUser.emailAddress;
    const password = authUser.password;
    context.data
      .deleteCourse(id, emailAddress, password)//takes in the course id, the user email and password because only authenticatedUsers can make a delete request
      .then((res) => {//The response
        console.log(res);
      })
      .then((errors) => {//Any errors caught will not delete the course and a console message will display
        if (errors.length) {
          setErrors({ errors });
          console.log("course wasn't deleted");
        } else {
          history.push("/");//If successful the page will redirect to courses
          console.log("course deleted");
        }
      })
      .catch(() => {
        history.push("/");
      });
  };

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          {/*If and authUser is logged in, the 3 Link buttons will render */}
        {authUser ? (
          <React.Fragment>
            <Link className="button" to={`/courses/${id}/update`}>
              Update Course
            </Link>
            <button className="button" to="button" onClick={delCourse}>
              Delete Course
            </button>
            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
            </React.Fragment>
             ) : ( 
              <React.Fragment>
              <Link className="button button-secondary" to="/">
              Return to List
            </Link>
              </React.Fragment>
              )}
              {/*If no authUser is logged in only the Return to List button will render*/}
        </div>
      </div>
      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>{`By`}</p>
              <p>{course.description}</p>
              <ReactMarkdown></ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
