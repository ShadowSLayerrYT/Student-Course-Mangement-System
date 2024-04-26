import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './viewattendance.css';

const ViewAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/viewAttendance');
        setAttendanceData(response.data);
      } catch (error) {
        console.error('Error fetching attendance data: ', error);
      }
    };

    fetchAttendanceData();
  }, []);

  return (
    <div>
      <h2>Attendance Data</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Course Name</th> {/* Add this table header */}
            <th>Present Students</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((attendance, index) => (
            <tr key={index}>
              <td>{attendance.date}</td>
              <td>{attendance.courseName}</td> {/* Render the course name */}
              <td>
                <ul>
                  {attendance.presentStudents.map((student, i) => (
                    <li key={i}>{student.studentName}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAttendance;
