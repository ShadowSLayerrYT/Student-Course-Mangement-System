import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './attendance.css';

const Attendance = () => {
    const [students, setStudents] = useState([]);
    const [attendanceList, setAttendanceList] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/viewstudents');
            setStudents(response.data);
            const initialAttendanceList = response.data.map(student => ({
                studentId: student.studentId,
                studentName: student.studentName,
                present: false 
            }));
            setAttendanceList(initialAttendanceList);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleCheckboxChange = (studentId) => {
        const updatedAttendanceList = attendanceList.map(student => {
            if (student.studentId === studentId) {
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
                studentId: student.studentId,
                attendanceStatus: student.present ? 'present' : 'absent'
            }));
            const response = await axios.post('http://localhost:5000/submitattendance', formattedAttendanceData);
            console.log('Attendance submitted successfully:', response.data);
            window.alert('Attendance added successfully');
        } catch (error) {
            console.error('Error submitting attendance:', error);
            window.alert('Failed to add attendance');
        }
    };
    
    
    return (
        <div className="attendance-container">
            <h2>Attendance</h2>
            <table className="attendance-table">
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Present</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.studentId}>
                            <td>{student.studentId}</td>
                            <td>{student.studentName}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={attendanceList.find(s => s.studentId === student.studentId)?.present}
                                    onChange={() => handleCheckboxChange(student.studentId)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Attendance;
