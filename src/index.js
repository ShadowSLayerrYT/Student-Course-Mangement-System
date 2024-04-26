import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login';
import Home from './home';
import ChangePassword from './changepassword';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Book from './book';
import MyProfile from './myprofile';
import MyCourses from './components/viewcourses';
import Faculty from './faculty'; 
import Admin from './admin'; 
import AddCourse from './addcourse';
import DeleteCourse from './components/deletecourse';
import Courses from './components/studentcourse';
import Students from './components/viewstudents';
import Facultydata from './components/facultydata';
import DeleteFaculty from './components/deletefaculty';
import CheckAssign from './components/checkassign';
import SubmitAttendance from './components/attendance';
import ViewAttendance from './components/viewattendance';
import FacultyNotice from './components/facultynotice';
import StudentNotice from './components/studentnotice';

function Website() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/book" element={<Book />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/components/viewcourses" element={<MyCourses />} /> 
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/addcourse" element={<AddCourse/>} />
        <Route path="/components/deletecourse" element={<DeleteCourse />} /> 
        <Route path="/components/studentcourse" element={<Courses />} /> 
        <Route path="/components/viewstudents" element={<Students/>} />
        <Route path="/components/facultydata" element={<Facultydata/>} /> 
        <Route path="/components/deletefaculty" element={<DeleteFaculty/>} /> 
        <Route path="/components/checkassign" element={<CheckAssign/>} /> 
        <Route path="/components/attendance" element={<SubmitAttendance/>} /> 
        <Route path="/components/viewattendance" element={<ViewAttendance/>} /> 
        <Route path="/components/facultynotice" element={<FacultyNotice/>} /> 
        <Route path="/components/studentnotice" element={<StudentNotice/>} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Website />, document.getElementById('root'));
