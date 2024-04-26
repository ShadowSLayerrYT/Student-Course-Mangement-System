// studentcourses.js
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './studentcourse.css'; // Import the CSS file for styling

function ViewCourses() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null); // Initialize selectedCourse state
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchStudentCourses();
    }, []);

    const fetchStudentCourses = () => {
        const url = "http://localhost:5000/studentcourse"; // Endpoint to fetch student course data
        Axios.get(url)
            .then(res => {
                setCourses(res.data);
            })
            .catch(err => {
                console.error("Error fetching student courses:", err);
                setError("Failed to fetch student course data");
            });
    };

    const handleCourseClick = (course) => {
        setSelectedCourse(course); // Update selectedCourse state when a course is clicked
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = () => {
        if (!file) {
            setErrorMessage('Please select a file to submit');
            return;
        }
    
        if (!selectedCourse) {
            setErrorMessage('Please select a course');
            return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('courseName', selectedCourse.courseName);
    
        Axios.post('http://localhost:5000/submitAssignment', formData)
            .then(res => {
                console.log(res.data);
                if (res.data && res.data.success) {
                    window.alert('Assignment submitted successfully');
                } else {
                    window.alert('Failed to submit assignment');
                }
            })
            .catch(err => {
                console.error('Error submitting assignment:', err);
                window.alert('Submitted an assignment');
            });
    };
    
    return (
        <div className='full-height'>
            <h3>Select a Course</h3>
            {error && <p className="error-message">{error}</p>}
            <table className='tablestyle'>
                <thead>
                    <tr>
                        <th className='firstcolumn'>Course Name</th>
                        <th>Section Number</th>
                        <th>Faculty Name</th>
                        <th>Semester</th>
                        <th>Year</th>
                        <th>Add Assignments</th> {/* New column for the button */}
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, index) => (
                        <tr key={index} onClick={() => handleCourseClick(course)} className={selectedCourse === course ? 'selected' : ''}>
                            <td>{course.courseName}</td>
                            <td>{course.sectionNumber}</td>
                            <td>{course.facultyName}</td>
                            <td>{course.semester}</td>
                            <td>{course.academicYear}</td>
                            <td><button onClick={() => handleCourseClick(course)}>Add</button></td> {/* Button in the new column */}
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {selectedCourse && (
                <div>
                    <h3>Submit Assignment</h3>
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleSubmit}>Submit</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            )}
        </div>
    );
}

export default ViewCourses;
