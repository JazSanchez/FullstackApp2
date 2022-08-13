import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      .createCourse(course)
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
    <div className="wrap">
      <h2>Create Course</h2>
      <Form
        cancel={cancel}
        errors={errors}
        submit={submit}
        submitButtonText="Create Course"
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

// //  return(

// //     <main>
// //     <div className="wrap">
// //         <h2>Create Course</h2>
// //         <div className="validation--errors">
// //             <h3>Validation Errors</h3>
// //             <ul>
// //                 <li>Please provide a value for "Title"</li>
// //                 <li>Please provide a value for "Description"</li>
// //             </ul>
// //         </div>
// //         <form>
// //             <div className="main--flex">
// //                 <div>
// //                     <label htmlFor="courseTitle">Course Title</label>
// //                     <input id="courseTitle" name="courseTitle" type="text" value=""/>

// //                     <p>By Joe Smith</p>

//                     <label for="courseDescription">Course Description</label>
//                     <textarea id="courseDescription" name="courseDescription"></textarea>
//                 </div>
//                 <div>
//                     <label htmlFor="estimatedTime">Estimated Time</label>
//                     <input id="estimatedTime" name="estimatedTime" type="text" value=""/>

//                     <label for="materialsNeeded">Materials Needed</label>
//                     <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
//                 </div>
//             </div>
//             <button className="button" type="submit" >Create Course</button><button className="button button-secondary" onClick="event.preventDefault(); location.href='/' ">Cancel</button>
//         </form>
//     </div>
// </main>

//  )

export default Createcourse;
