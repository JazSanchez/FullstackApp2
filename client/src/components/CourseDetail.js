import React, { useState, useEffect } from 'react';
import axios from 'axios';





function CourseDetail() {
    const [course, setCourse] = useState({})
    const [id, setId] = useState(2)
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${id}`)
        .then(res => {
            console.log(res)
            setCourse(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [id])

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href={`${course.id}/update`}>Update Course</a>
                    <a className="button" href="/">Delete Course</a>
                    <a className="button button-secondary" href="/">Return to List</a>
                </div>
            </div>
            
            <div className="wrap" value={id} onChange={e => setId(e.target.value)}>
                <h2>Course Detail</h2>
                <form >
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>{`By ${course.User.firstName} ${course.User.lastName}`}</p>

                            <p>{course.description}</p>
             
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>14 hours</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <li>1/2 x 3/4 inch parting strip</li>
                                <li>1 x 2 common pine</li>
                                <li>1 x 4 common pine</li>
                                <li>1 x 10 common pine</li>
                                <li>1/4 inch thick lauan plywood</li>
                                <li>Finishing Nails</li>
                                <li>Sandpaper</li>
                                <li>Wood Glue</li>
                                <li>Wood Filler</li>
                                <li>Minwax Oil Based Polyurethane</li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>

    )

}

export default CourseDetail;