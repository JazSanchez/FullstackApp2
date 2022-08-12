import React from 'react';
// import axios from 'axios'
// import { Context } from '../../Context';


function Createcourse() {
 
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
                    <label for="courseTitle"></label>
                    {/* <input id="courseTitle" name="courseTitle" type="text" value=""> */}

                    <p>By Joe Smith</p>

                    <label for="courseDescription">Course Description</label>
                    <textarea id="courseDescription" name="courseDescription"></textarea>
                </div>
                <div>
                    <label for="estimatedTime">Estimated Time</label>
                    {/* <input id="estimatedTime" name="estimatedTime" type="text" value=""> */}

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