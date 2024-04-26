//add  course(faculty)
 
import React from 'react';
import './book.css';
import { callApi, errorResponse, getSession } from './main';

const space = { height: '5px' };

export function addCourse() {
    var courseNameInput = document.getElementById('courseNameInput');
    var courseCodeInput = document.getElementById('courseCodeInput');
    var sectionNumberInput = document.getElementById('sectionNumberInput');
    var facultyNameInput = document.getElementById('facultyNameInput');
    var semesterSelect = document.getElementById('semesterSelect');
    var yearSelect = document.getElementById('yearSelect');
    courseNameInput.style.border="";
    courseCodeInput.style.border="";
    sectionNumberInput.style.border="";
    facultyNameInput.style.border="";
    semesterSelect.style.border="";
    yearSelect.style.border="";
    if(courseNameInput.value==="")
    {
        courseNameInput.style.border = "1px solid red";
        courseNameInput.focus();
        return;
    }
    if(courseCodeInput.value==="")
    {
        courseCodeInput.style.border = "1px solid red";
        courseCodeInput.focus();
        return;
    }
    if(sectionNumberInput.value==="")
    {
        sectionNumberInput.style.border = "1px solid red";
        sectionNumberInput.focus();
        return;
    }
    if(facultyNameInput.value==="")
    {
        facultyNameInput.style.border = "1px solid red";
        facultyNameInput.focus();
        return;
    }
    if(semesterSelect.value==="")
    {
        semesterSelect.style.border = "1px solid red";
        semesterSelect.focus();
        return;
    }
    if(yearSelect.value==="")
    {
        yearSelect.style.border = "1px solid red";
        yearSelect.focus();
        return;
    }

    var url = "http://localhost:5000/book/addnewcourse";
    var data = JSON.stringify({
        courseName : courseNameInput.value,
        courseCode : courseCodeInput.value,
        sectionNumber : sectionNumberInput.value,
        facultyName : facultyNameInput.value,
        semester : semesterSelect.value,
        year : yearSelect.value
    });
    callApi("POST", url, data, submitSuccess, errorResponse);

    // Clear input fields after submission
    courseNameInput.value="";
    courseCodeInput.value="";
    sectionNumberInput.value="";
    facultyNameInput.value="";
    semesterSelect.value="";
    yearSelect.value="";
}

function submitSuccess(res) {
    var data = JSON.parse(res);
    alert(data);
}

class Book extends React.Component {
    constructor() {
        super();
        this.sid = getSession('sid');
        if (this.sid === '') window.location.replace('/');
    }

    render() {
        const academicYears = Array.from({length: 10}, (_, index) => {
            const startYear = new Date().getFullYear() - index;
            const endYear = startYear + 1;
            return `${startYear}-${endYear}`;
        });

        return (
            <div className='full-height'>
                <div className='bookcontent'>
                    <div style={space}></div>
                    <div className='table-container'>
                        <div className='row'>
                            <div className='column'>
                                <div>Course Name</div>
                            </div>
                            <div className='column'>
                                <div>Course Code</div>
                            </div>
                            <div className='column'>
                                <div>Section number</div>
                            </div>
                            <div className='column'>
                                <div>Faculty Name</div>
                            </div>
                            <div className='column'>
                                <div>Select Semester</div>
                            </div>
                            <div className='column'>
                                <div>Select Academic Year</div>
                            </div>
                        </div>
                    </div>
                    <div className='table-container'>
                        <div className='row'>
                            <div className='column'>
                                <div><input type='text' id='courseNameInput' className='txtbox' /></div>
                            </div>
                            <div className='column'>
                                <div><input type='text' id='courseCodeInput' className='txtbox' /></div>
                            </div>
                            <div className='column'>
                                <div><input type='text' id='sectionNumberInput' className='txtbox' /></div>
                            </div>
                            <div className='column'>
                                <div><input type='text' id='facultyNameInput' className='txtbox' /></div>
                            </div>
                            <div className='column'>
                                <div>
                                    <select id='semesterSelect' className='txtbox'>
                                        <option value=''>Select Semester</option>
                                        <option value='Odd'>Odd</option>
                                        <option value='Even'>Even</option>
                                    </select>
                                </div>
                            </div>
                            <div className='column'>
                                <div>
                                    <select id='yearSelect' className='txtbox'>
                                        <option value=''>Select Year</option>
                                        {academicYears.map(year => <option key={year} value={year}>{year}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={space}></div>
                    <div style={space}></div>
                    <div button className='btn1' onClick={addCourse}>Submit</div>
                </div>
            </div>
        );
    }
}

export default Book;
