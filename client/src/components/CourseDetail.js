import React, { useState, useContext } from 'react';
import { Context } from './Context';
import {useNavigate, useParams  } from 'react-router-dom';
import Form from './Form';

export default function CourseDetail() {
    
    
    const history = useNavigate();
    const context = useContext(Context);
    const authUser = context.authenticatedUser;
    console.log(context);
  
    const [course, setCourse] = useState("");
    const [errors, setErrors] = useState(''); 
    const {id} = useParams();
  
    const submit = (e) => {
      const {} = authUser;
      console.log(authUser);
      const course = {
        title: e.target[0].value,
        description: e.target[1].value,
        estimatedTime: e.target[2].value,
        materialsNeeded: e.target[3].value,
          userId: id
      };
  
      context.data
        .getCourse(id)
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
        //   history("/error");
        });
    };

    context.data
    .deleteCourse(id)
    .then((errors) => {
      if (errors.length) {
        setErrors({ errors });
      } else {
        // history("/");
      console.log('course deleted')
      }
    })
    .catch((err) => {
      console.log(err);
    //   history("/error");
    });



  
    const cancel = () => {
        //  history('/');
  
    };


    return (
        <div className="main--flex">
            <h1>Course Detail</h1>
            <Form
              cancel={cancel}
              errors={errors}
              submit={submit}
              submitButtonText="Update Course"
              elements={() => (
                <React.Fragment>
                   <label htmlFor="titile">Course Title</label>
                  <input
                    id="titile"
                    name="titile"
                    type="text"
                    defaultValue='' />
                    <label htmlFor="description">Description</label>
                  <input
                    id="description"
                    name="description"
                    type="text"
                    defaultValue=''
                    />
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    defaultValue=''
                    />
                    <label htmlFor="materialsNeeded">Materials Needed</label>
                  <input
                    id="materialsNeeded"
                    name="materialsNeeded"
                    type="text"
                    defaultValue=''
                     />
                </React.Fragment>
              )} />
            {/* <p>
              Already have a user account? <Link to="/signin">Click here</Link> to sign in!
            </p> */}
          </div>
      );
    }


      

    // // const deleCourse = () => {
    // //     context.data.deleteCourse()
    // //     .then(res => {
    // //         console.log(res)
    // //         setCourses(res)
    // //     })
    // //     .catch(err => {
    // //         console.log(err)
    //     })
  
  
  

    // let deleteCourse = (id) => {
    //     axios.delete(`http://localhost:5000/api/courses/${id}`)
    //     .then(response => {
    //         if (response.data != null){
    //             setCourse({course: Courses.filter((course)=> {
    //                 return course.id !== id;
    //             })})
    //         }
    //     })
    // }

    // return (
    //     <main>
    //         <div className="actions--bar">
    //             <div className="wrap">
    //                 <a className="button" href={`${course.id}/update`}>Update Course</a>
    //                 <a className="button"  href="/">Delete Course</a>
    //                 <a className="button button-secondary" href="/">Return to List</a>
    //             </div>
    //         </div>
            
    //         <div className="wrap" value={id} >
    //             <h2>Course Detail</h2>
    //             <form >
    //                 <div className="main--flex">
    //                     <div>
    //                         <h3 className="course--detail--title">Course</h3>
    //                         <h4 className="course--name">{course.title}</h4>
    //                         <p></p>

    //                         <p></p>
             
    //                     </div>
    //                     <div>
    //                         <h3 className="course--detail--title"></h3>
    //                         <p>14 hours</p>

    //                         <h3 className="course--detail--title"></h3>
    //                         <ul className="course--detail--list">
    //                             <li>1/2 x 3/4 inch parting strip</li>
    //                             <li>1 x 2 common pine</li>
    //                             <li>1 x 4 common pine</li>
    //                             <li>1 x 10 common pine</li>
    //                             <li>1/4 inch thick lauan plywood</li>
    //                             <li>Finishing Nails</li>
    //                             <li>Sandpaper</li>
    //                             <li>Wood Glue</li>
    //                             <li>Wood Filler</li>
    //                             <li>Minwax Oil Based Polyurethane</li>
    //                         </ul>
    //                     </div>
    //                 </div>
    //             </form>
    //         </div>
    //     </main>

    // )

// }

