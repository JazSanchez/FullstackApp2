import React, { useEffect, useState } from 'react';
import axios from 'axios';


function UpdateCourse() {
    const [course, setCourse] = useState({})
    const [id, setId] = useState(2)
    const [updatedAt, setUpdatedAt] = useState(null);

    useEffect(() => {
  
        axios.put(`http://localhost:5000/courses/${id}/update`)
            .then(response => setUpdatedAt(response.data.updatedAt));

    }, [id]);

return ( 
    <div className="wrap">
                <h2>Update Course</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            {/* <input id="courseTitle" name="courseTitle" type="text" value="Build a Basic Bookcase"> */}

                            <p>By Joe Smith</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription"></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            {/* <input id="estimatedTime" name="estimatedTime" type="text" value="14 hours"> */}

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick="event.preventDefault(); location.href='/';">Cancel</button>
                </form>
            </div>
)
}

export default UpdateCourse;