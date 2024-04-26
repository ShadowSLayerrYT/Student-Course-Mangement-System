import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './attendance.css';

const Attendance = () => {
    const [students, setStudents] = useState([]);
    const [attendanceList, setAttendanceList] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchStudents();
        fetchCourses();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/viewstudents');
            setStudents(response.data);
            const initialAttendanceList = response.data.map(student => ({
                emailid: student.emailid,
                studentName: `${student.firstname} ${student.lastname}`,
                present: false
            }));
            setAttendanceList(initialAttendanceList);
        } catch (error) {
            console.error('Error fetching students:', error);
            setError('Failed to fetch student data');
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/viewcourses');
            setCourses(response.data);
            if (response.data.length > 0) {
                setSelectedCourse(response.data[0].courseName); // Set the default selected course
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
            setError('Failed to fetch course data');
        }
    };

    const handleCheckboxChange = (emailid) => {
        const updatedAttendanceList = attendanceList.map(student => {
            if (student.emailid === emailid) {
                return {
                    ...student,
                    present: !student.present
                };
            }
            return student;
        });
        setAttendanceList(updatedAttendanceList);
    };

    const handleSubmit = async () => {
        try {
            const formattedAttendanceData = attendanceList.map(student => ({
                emailid: student.emailid,
                studentName: student.studentName,
                present: student.present
            }));
            const response = await axios.post('http://localhost:5000/submitAttendance', {
                courseName: selectedCourse, // Include the selected course name in the attendance data
                date: new Date().toISOString().slice(0, 10),
                presentStudents: formattedAttendanceData
            });
            console.log('Attendance submitted successfully:', response.data);
            window.alert('Attendance added successfully');
        } catch (error) {
            console.error('Error submitting attendance:', error);
            window.alert('Failed to submit attendance');
        }
    };

    return (
        <div className="attendance-container">
            <h2>Attendance</h2>
            <div>
                <label htmlFor="courseSelect">Select Course:</label>
                <select id="courseSelect" onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse}>
                    {courses.map(course => (
                        <option key={course._id} value={course.courseName}>{course.courseName}</option>
                    ))}
                </select>
            </div>
            <table className="attendance-table">
                <thead>
                    <tr>
                        <th>Email ID</th>
                        <th>Student Name</th>
                        <th>Present</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.emailid}>
                            <td>{student.emailid}</td>
                            <td>{`${student.firstname} ${student.lastname}`}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={attendanceList.find(s => s.emailid === student.emailid)?.present}
                                    onChange={() => handleCheckboxChange(student.emailid)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Attendance;
