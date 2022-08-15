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
          history("/notfound");
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
      // history("/notfound");
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


      
