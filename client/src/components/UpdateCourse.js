import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Context } from "./Context";
import Form from "./Form";


function UpdateCourse() {

  let history = useHistory();
  const context = useContext(Context);
  const authUser = context.authUser;
  console.log(context);

  const [course, setCourse] = useState('');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMAterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);
  const { id } = useParams();


  useEffect(() => {
    context.data.getSingleCourse(id)
    .then(res => {
        console.log(res)
        setCourse(res)
    })
    .catch(err => {
        console.log(err)
    })


  }, []) 


  const change = (event) =>{
    const value = event.target.value;
    switch(event.target.name){
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

 const submit = () => {
  const emailAddress = authUser.emailAddress
  const password = authUser.password
   const course ={
    title,
    description,
    estimatedTime,
    materialsNeeded
   }


  context.data.updateCourse(course, id , emailAddress, password)
  .then(res => {
    console.log(res)
  })
  .then((errors) => {
    if (errors.length) {
      setErrors({ errors });
    } else {
      history.push("/");
    console.log('course updated')
    }
  })
  .catch(() => {
    history.push("/");
  });




 }

 const cancel = () => {
  history.push('/courses');

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
                elements={() =>(
                <React.Fragment>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="title">Course Title</label>
                            <input  
                                id="courseTitle" 
                                name="title" 
                                type="text" 
                                defaultValue=''
                                onChange={change}   
                                />
                              
                                <p> By </p>
                        
                            <label htmlFor="description">Course Description</label>
                            <textarea 
                                id="description" 
                                name="description"
                                defaultValue=''
                                onChange={change}
                            />
                        </div>

                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input 
                                id="estimatedTime" 
                                name="estimatedTime" 
                                type="text" 
                                defaultValue=''
                                onChange={change}
                                />
                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea 
                                id="materialsNeeded" name="materialsNeeded"
                                defaultValue=''
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