import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {

  //Define state variables
  const [studentList, setStudentList] = useState([{}]); //default value is empty array of objects
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');

  //Fast API Call to Get all student data and add student to the
  useEffect(() => {
    getStudents()
  }, []);

  //Fast API call to add a new student
  const addStudent = () => {
    const student = {'student_name': studentName, 'student_email': studentEmail, 'student_phone': studentPhone}
    axios.post('http://127.0.0.1:8000/students', student)
    .then(response=>{alert(response); getStudents();})
    .catch(err=>console.log(err))
  }

  const getStudents = () => {
    axios.get('http://127.0.0.1:8000/students')
    .then(
      response => {
        console.log(response.data)
        setStudentList(response.data)
      }
    )//resolve the promise
    .catch(err => {
      console.log(err)
    })
  }



  return (
    <div className="container">
      <div 
        className="text-center mt-3 list-group-item justify-content-center align-items-center mx-auto"
        style={{"width": "80vw", "backgroundColor":"#ffffff"}}>
          <h2 className="card text-white bg-primary mb-1 pb-2">School Management System</h2>
          <h6 className="card text-white bg-primary mb-1 pb-1">Manage Your Students</h6>
          <div className="card-body">
            <h5 className="card text-white bg-dark pb-1">Add Student</h5>
            <span className="card-text">
              <input onChange={event => setStudentName(event.target.value)} className="form-control stud-name mb-2" placeholder="Enter Name" />
              <input onChange={event => setStudentEmail(event.target.value)} className="form-control stud-email mb-2" placeholder="Enter Email" />
              <input onChange={event => setStudentPhone(event.target.value)} className="form-control stud-phone mb-3" placeholder="Enter Phone" />
              <button onClick={addStudent} className="btn btn-outline-primary mb-4" style={{"fontWeight": "bold"}}>Add Student</button>
            </span>
            <h5 className="card text-white bg-dark pb-1">Your Students</h5>
            <div>

            </div>
          </div>
          <h6 className="card text-dark bg-warning py-1">All rights reserved &copy; 2021</h6>
      </div>
    </div>
  );
}

export default App;
