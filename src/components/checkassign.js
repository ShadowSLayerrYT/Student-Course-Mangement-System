import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './checkassign.css';

function CheckAssign() {
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = () => {
        Axios.get('http://localhost:5000/submissions')
            .then(res => {
                setSubmissions(res.data);
            })
            .catch(err => {
                console.error('Error fetching submissions:', err);
                setError('Failed to fetch submissions');
            });
    };

    return (
        <div className="submission-container">
            <h2>Student Submissions</h2>
            {error && <p className="error-message">Error: {error}</p>}
            <ul className="submission-list">
                {submissions.map((submission, index) => (
                    <li key={index}>
                        <span className="file-name">File Name: {submission.fileName}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CheckAssign;
