import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentList from './components/StudentList';

import './App.css';

function App() {

  //Define state variables
  const [studentList, setStudentList] = useState([{}]); //default value is empty array of objects
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');

  //Fast API Call to Get all student data and add student to the
  useEffect(() => {
    getStudents()
  }, []);
  const addNewStudent = (student) => {
    axios.post('http://127.0.0.1:8000/students', student)
    .then(response=>{
      alert("Student Added Successfully!"); 
      getStudents();
      clearState();
    })
    .catch(err=>console.log(err))
  }
  const updateStudent = (student) => {
    axios.put(`http://127.0.0.1:8000/students/${studentId}`, student)
    .then(response=>{
      alert("Student Updated Successfully!"); 
      getStudents();
      clearState();
    })
    .catch(err=>console.log(err))
  }
  //Fast API call to add a new student
  const addUpdateStudent = () => {
    const student = {'student_name': studentName, 'student_email': studentEmail, 'student_phone': studentPhone}
    // eslint-disable-next-line
    if(studentId != ''){
      updateStudent(student)
    }else{
      addNewStudent(student)
    }
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

  const clearState = () => {
    setStudentId('');
    setStudentName('');
    setStudentEmail('');
    setStudentPhone('');
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
              <input value={studentName} onChange={event => setStudentName(event.target.value)} className="form-control stud-name mb-2" placeholder="Enter Name" />
              <input value={studentEmail} onChange={event => setStudentEmail(event.target.value)} className="form-control stud-email mb-2" placeholder="Enter Email" />
              <input value={studentPhone} onChange={event => setStudentPhone(event.target.value)} className="form-control stud-phone mb-3" placeholder="Enter Phone" />
              {studentId ? <button onClick={addUpdateStudent} className="btn btn-outline-warning mb-4" style={{"fontWeight": "bold"}}>Update Student</button> 
                         : <button onClick={addUpdateStudent} className="btn btn-outline-primary mb-4" style={{"fontWeight": "bold"}}>Add Student</button>}
            </span>
            <h5 className="card text-white bg-dark pb-1">Your Students</h5>
            <div>
              <StudentList 
              setStudentId={setStudentId}
              setStudentName={setStudentName}
              setStudentEmail={setStudentEmail}
              setStudentPhone={setStudentPhone}
              getStudents={getStudents}
              studentList={studentList} />
            </div>
          </div>
          <h6 className="card text-dark bg-warning py-1">All rights reserved &copy; 2021</h6>
      </div>
    </div>
  );
}

export default App;
