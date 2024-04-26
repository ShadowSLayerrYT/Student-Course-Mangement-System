import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './deletefaculty.css';

function DeleteFaculty() {
    // State variables to store faculty data and selected faculty for deletion
    const [facultyData, setFacultyData] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState('');

    // Fetch faculty data from the server on component mount
    useEffect(() => {
        fetchFacultyData();
    }, []);

    // Function to fetch faculty data from the server
    const fetchFacultyData = () => {
        const url = "http://localhost:5000/viewfaculty";
        Axios.get(url)
            .then(res => {
                setFacultyData(res.data);
            })
            .catch(err => {
                console.error("Error fetching faculty data:", err);
            });
    };

    // Function to handle faculty selection for deletion
    const handleSelectFaculty = (event) => {
        setSelectedFaculty(event.target.value);
    };

    // Function to handle faculty deletion
    const handleDeleteFaculty = () => {
        if (selectedFaculty) {
            const url = "http://localhost:5000/deletefaculty";
            Axios.delete(url, { data: { firstname: selectedFaculty } })
                .then(res => {
                    console.log("Faculty deleted successfully:", res.data);
                    // Refresh faculty data after deletion
                    fetchFacultyData();
                    // Clear selected faculty
                    setSelectedFaculty('');
                })
                .catch(err => {
                    console.error("Error deleting faculty:", err);
                });
        } else {
            console.error("Please select a faculty to delete.");
        }
    };

    return (
        <div className="delete-faculty-container">
            <h2>Delete Faculty</h2>
            <select className="faculty-select" onChange={handleSelectFaculty} value={selectedFaculty}>
                <option value="">Select Faculty</option>
                {facultyData.map((faculty, index) => (
                    <option key={index} value={faculty.firstname}>{faculty.firstname}</option>
                ))}
            </select>
            <button className="delete-button" onClick={handleDeleteFaculty}>Delete</button>
        </div>
    );
}

export default DeleteFaculty;
