import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './facultydata.css';

const ViewFaculty = () => {
  const [facultyData, setFacultyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/viewfaculty');
        setFacultyData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="faculty-container">
      <h1 className="faculty-title">Faculty List</h1>
      <table className="faculty-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact Number</th>
            <th>Email ID</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {facultyData.map((faculty) => (
            <tr key={faculty._id}>
              <td>{faculty.firstname}</td>
              <td>{faculty.lastname}</td>
              <td>{faculty.contactno}</td>
              <td>{faculty.emailid}</td>
              <td>{faculty.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewFaculty;