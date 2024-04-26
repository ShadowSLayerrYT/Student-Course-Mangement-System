import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './viewstudents.css'; // You may create a separate CSS file for styling

const ViewStudents = () => {
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/viewstudents'); // Adjust the endpoint according to your backend route
        setStudentsData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="students-container">
      <h1 className="students-title">Students List</h1>
      <table className="students-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact Number</th>
            <th>Email ID</th>
            
          </tr>
        </thead>
        <tbody>
          {studentsData.map((student) => (
            <tr key={student._id}>
              <td>{student.firstname}</td>
              <td>{student.lastname}</td>
              <td>{student.contactno}</td>
              <td>{student.emailid}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStudents;
