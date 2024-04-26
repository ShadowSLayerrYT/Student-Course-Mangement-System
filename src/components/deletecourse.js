import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import  './deletecourse.css';

function DeleteCourse() {
    // State variables to store course data and selected course for deletion
    const [courseData, setCourseData] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');

    // Fetch course data from the server on component mount
    useEffect(() => {
        fetchCourseData();
    }, []);

    // Function to fetch course data from the server
    const fetchCourseData = () => {
        const url = "http://localhost:5000/viewcourses";
        Axios.get(url)
            .then(res => {
                setCourseData(res.data);
            })
            .catch(err => {
                console.error("Error fetching course data:", err);
            });
    };

    // Function to handle course selection for deletion
    const handleSelectCourse = (event) => {
        setSelectedCourse(event.target.value);
    };

    // Function to handle course deletion
    const handleDeleteCourse = () => {
        if (selectedCourse) {
            const url = "http://localhost:5000/deletecourse";
            Axios.delete(url, { data: { courseName: selectedCourse } })
                .then(res => {
                    console.log("Course deleted successfully:", res.data);
                    // Refresh course data after deletion
                    fetchCourseData();
                    // Clear selected course
                    setSelectedCourse('');
                })
                .catch(err => {
                    console.error("Error deleting course:", err);
                });
        } else {
            console.error("Please select a course to delete.");
        }
    };

    return (
        <div className="delete-course-container">
            <h2>Delete Course</h2>
            <select className="course-select" onChange={handleSelectCourse} value={selectedCourse}>
                <option value="">Select Course</option>
                {courseData.map((course, index) => (
                    <option key={index} value={course.courseName}>{course.courseName}</option>
                ))}
            </select>
            <button className="delete-button" onClick={handleDeleteCourse}>Delete</button>
        </div>
    );
}

export default DeleteCourse;
