import Student from "./Student";

function StudentList(props){
    return(
        <div>
            <ul>
                {
                    props.studentList.map(
                        (stud, index) => {
                            return(<Student 
                                setStudentId={props.setStudentId}
                                setStudentName={props.setStudentName}
                                setStudentEmail={props.setStudentEmail}
                                setStudentPhone={props.setStudentPhone}
                                getStudents={props.getStudents}
                                student={stud} key={index}/>)
                        }
                    )
                }
            </ul>
        </div>
    )
}

export default StudentList;