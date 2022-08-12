import React, { useContext, useState, useEffect }from 'react';
import { Context } from './Context';


function Createcourse() {
  const context = useContext(Context)
    console.log(context)

    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[course, setCourse] = useState('');


const handleSubmit = (e) => {
    e.preventDefault();
    addCourse(title, description)
};


const addCourse = (title, description) => {
    client.post('', {
        title: title,
        description: description,
    })
    .then((response)=> {
        setCourse([response.data, ... course]);
    });
    setTitle('');
    setDescription('');
}
       
    

 return(

    <main>
    <div className="wrap">
        <h2>Create Course</h2>
        <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
                <li>Please provide a value for "Title"</li>
                <li>Please provide a value for "Description"</li>
            </ul>
        </div>
        <form>
            <div className="main--flex">
                <div>
                    <label htmlFor="courseTitle">Course Title</label>
                    <input id="courseTitle" name="courseTitle" type="text" value=""/>

                    <p>By Joe Smith</p>

                    <label for="courseDescription">Course Description</label>
                    <textarea id="courseDescription" name="courseDescription"></textarea>
                </div>
                <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input id="estimatedTime" name="estimatedTime" type="text" value=""/>

                    <label for="materialsNeeded">Materials Needed</label>
                    <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                </div>
            </div>
            <button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick="event.preventDefault(); location.href='/' ">Cancel</button>
        </form>
    </div>
</main>

 )

};

export default Createcourse;