import React, { useState, useContext } from "react";
import { Context } from "./Context";
import { useNavigate, Link } from "react-router-dom";
import Form from "./Form";
// import ReactMarkdown from "react-markdown";

export default function CourseDetail() {
  const history = useNavigate();
  const context = useContext(Context);
  const authUser = context.authenticatedUser;
  console.log(context);

  const [course, setCourse] = useState("");
  const [title, setTitle] = useState('');
  const [id, setId] = useState(2);
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMAterialsNeeded] = useState("");
  const [errors, setErrors]= useState ([]);


 const change = (event) => {
   const value = event.target.value;
   switch (event.target.name){
  case "title":
    setTitle(value);
    break;
  case "id":
    setId(value);
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


  const submit = () =>{
    const emailAddress = authUser.emailAddress
    const password = authUser.password
    const userId = authUser.id
    
    const details = {
      course,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    }

    console.log(details)



    context.data
      .getCourse(details)
      .then((errors) => {
        if (errors.length) {
          setErrors({ errors });
        } else {
          // history("/");
          console.log("course detail");
        }
      })
      .catch((err) => {
        console.log(err);
        // history("/notfound");
      });
  };


  

  // context.data
  //   .deleteCourse(id)
  //   .then((errors) => {
  //     if (errors.length) {
  //       setErrors({ errors });
  //     } else {
  //       // history("/");
  //       console.log("course deleted");
  //     }
  //   })
  //   .catch((err) => {
  //     // console.log(err);
  //     // history("/notfound");
  //   });

  const cancel = () => {
    //  history('/');
  };

  return (
    <main>
      <div className="action--bar">
        <div className="wrap">
          

        </div>
      </div>
      <div className="wrap">
        <h2>Course Detail</h2>
        <Form
          cancel={cancel}
          errors={errors}
          submit={submit}
          submitButtonText="Create Course"
          elements={() => (
            <React.Fragment>
              <div className="main--flex">
                <div>
                  <label htmlFor="title">{course.title}</label>
                  <h4 className="course--name"></h4>
                  <p>By {course.firstName} {course.lastName}</p>
                  <p>
                    High-end furniture projects are great to dream about. But
                    unless you have a well-equipped shop and some serious
                    woodworking experience to draw on, it can be difficult to
                    turn the dream into a reality.
                  </p>

                  <p>
                    Not every piece of furniture needs to be a museum showpiece,
                    though. Often a simple design does the job just as well and
                    the experience gained in completing it goes a long way
                    toward making the next project even better.
                  </p>
                </div>
                <div>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <p>14 hours</p>

                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ul className="course--detail--list">
                    <li>1/2 x 3/4 inch parting strip</li>
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
