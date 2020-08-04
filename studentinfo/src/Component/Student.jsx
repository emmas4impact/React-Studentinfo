import React, {Component} from 'react';
//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import  Row from 'react-bootstrap/Row';
import  Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { connect } from "react-redux";


const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({


getStudentThunk: (students) => dispatch(getStudentWithThunk(students)),
getProjectThunk :(projects) => dispatch(getProjectWithThunk(projects))
});
const getStudentWithThunk = (students) => {
    
    return async(dispatch, getState) => {
        const data= await fetch("http://localhost:3456/students")
        //students = await data.json()
        students  = await data.json()
       
        console.log("A thunk was used to dispatch this action", getState());
        dispatch({
            type: "GET_STUDENT",
            payload: students.Students,
        });
        console.log("hello", students)
    
    };
  };
  const getProjectWithThunk = (projects) => {
    
    return async(dispatch, getState) => {
        const data= await fetch("http://localhost:3456/projects")
        
        projects = await data.json()
       
        console.log("A thunk was used to dispatch this action", getState());
        dispatch({
            type: "GET_PROJECT",
            payload: projects.projects,
        });
        console.log("project", projects)
     
    };
  };

 

class Student extends Component {
    
    state={
        students: [],
        Total: 0,
        Projects: [],
        totalProject: 0,
        limit: 5,
        show: false,
        student:{
            firstname: "",
            surname: "",
            email: "",
            dateofbirth: ""
        },
        isLoading: false,
        errMess: ""
        

    }
    
    componentDidMount = async (id) =>{
        this.props.getStudentThunk(id)
        this.props.getProjectThunk(id)
        const response = await fetch("http://localhost:3456/students")
        const data = await response.json()
        
        console.log(data)
        this.setState({
            students: data.Students,
            Total: data.Total
        })

        const resp = await fetch("http://localhost:3456/projects")
        const project = await resp.json()
        this.setState({
            
            totalProject: project.total,
            Projects: project.projects
        })
        
       
    }
    
     handleClose = () => {
         this.setState({
             show: false
         })
     };
     handleShow = () => {
        this.setState({
            show: true
        })
     }
     saveStudent = async(e) =>{
        e.preventDefault()
        const resp = await fetch("http://localhost:3456/students",{
            method: "POST",
            body: JSON.stringify(this.state.student),
            headers: {
                "Content-Type": "application/json",
            }
        })
        
        if(resp.ok){
            alert("New Student Added!");
            
            this.setState({
                isLoading: false,
                errMess: "",
                student:{
                    firstname: "",
                    surname: "",
                    email: "",
                    dateofbirth: ""
                }
            })
            
        }else{
            let json =await resp.json();
            this.setState({
                isLoading: false,
                errMess: json.message
            })
        }
         
     }
     handleChange=(input) =>{
        let student =this.state.student;
        let currentId = input.currentTarget.id;
        
        if(currentId){
            student[currentId] =input.currentTarget.value;
        }
        
        this.setState({student: student})
     }
    
    render(){
      
        return(
            <>
            
            <Container style={{marginTop: "50px"}}>
            <Jumbotron>
               <h1>List Of All Students</h1>  
               <div style={{ display: "flex"}} onClick={this.handleShow}><Button>Add Student</Button></div>   
            </Jumbotron>
            <Row>
              {this.props.data.students.map(student=>(
                <Col md={4} className="mb-4"> 
                  <Card style={{ width: '18rem' }} key={student._id}>
                <Card.Img variant="top" src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fd3v0px0pttie1i.cloudfront.net%2Fuploads%2Fuser%2Flogo%2F2760563%2Fopengraph_3b24453d.png%3Fsource%3Dopengraph" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    <p>Name: {student.firstname}</p>
                    <p>Surname: {student.surname}</p>
                    <p>Email:{student.email}</p>
                    <p>Birth Date: {student.dateofbirth.slice(0,10)}</p>
                    </Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
            </Card>
            
            </Col>
            ))}
            </Row>
            <div style={{marginTop: "50px"}}><h1>Projects</h1> </div>
            <Table striped bordered hover >
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Project Name</th>
                    <th>Description</th>
                    <th>RepoUrl</th>
                    <th>LiveUrl</th>
                    <th>StudentID</th>
                    </tr>
                </thead>
                {this.props.data.projects.map(project=>(
                    
                    <tbody key={project._id}>
                    <tr>
                    <td>{project._id}</td>
                    <td>{project.projectname}</td>
                    <td>{project.description}</td>
                    <td>{project.repourl}</td>
                    <td>{project.liveurl}</td>
                    <td>{project.studentid}</td>
                    </tr>
                    
                </tbody>
                ))}
                </Table>
            </Container>
                  
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                            <Form.Control type="text" id="firstname" 
                            placeholder="First name"
                            value={this.state.student.firstname}
                             onChange={this.handleChange}/>
                            </Col>
                            <Col>
                            <Form.Control type="text" id="surname"
                            placeholder="Last name" 
                            value={this.state.student.surname}
                            onChange={this.handleChange}/>
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col>
                            <Form.Control type="email" id="email" 
                            placeholder="email"
                            value={this.state.student.email}
                             onChange={this.handleChange}/>
                            </Col>
                            <Col>
                            <Form.Control type="date"  id="dateofbirth" 
                            placeholder="date Of birth" 
                            value={this.state.student.dateofbirth}
                            onChange={this.handleChange}/>
                            </Col>
                            
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.saveStudent}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
                

          
           </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);