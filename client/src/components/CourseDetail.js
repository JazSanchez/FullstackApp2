import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
import { Context } from './Context';

function CourseDetail() {
    const context = useContext(Context)
    console.log(context)
    const [course, setCourses] = useState({})
    const [id, setId] = useState(2)
    
    useEffect(() => {
        context.data.deleteCourse(id)
        .then(res => {
            console.log(res)
            setCourses(res)
        })
        .catch(err => {
            console.log(err)
        })
  
  
      }, [])
  

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

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href={`${course.id}/update`}>Update Course</a>
                    <a className="button"  href="/">Delete Course</a>
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
                            <p></p>

                            <p></p>
             
                        </div>
                        <div>
                            <h3 className="course--detail--title">{course.estimatedTime}</h3>
                            <p>14 hours</p>

                            <h3 className="course--detail--title">{course.materialsNeeded}</h3>
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