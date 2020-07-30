import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Table from 'react-bootstrap/Table'
import  Row from 'react-bootstrap/Row';
import  Col from 'react-bootstrap/Col';
import {RiDeleteBin6Line} from 'react-icons/ri'
import {FiEdit} from 'react-icons/fi'

class Project extends Component {
    
    state={
      
        Projects: [],
        totalProject: 0,
        show: false,
        project:{
            projectname: "",
            description: "",
            repourl: "",
            liveurl: "",
            studentid: 0
        },
        isLoading: false,
        errMess: ""
        
    }
    
    componentDidMount = async () =>{
      

        const resp = await fetch("http://localhost:3457/projects")
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
    saveProject = async(e) =>{
       e.preventDefault()
       const resp = await fetch("http://localhost:3457/projects",{
           method: "POST",
           body: JSON.stringify(this.state.project),
           headers: {
               "Content-Type": "application/json",
           }
       })
       
       if(resp.ok){
           alert("New Project Added!");
           
           this.setState({
               isLoading: false,
               errMess: "",
               project:{
                projectname: "",
                description: "",
                repourl: "",
                liveurl: "",
                studentid: 0
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
       let project =this.state.project;
       let currentId = input.currentTarget.id;
       
       if(currentId){
        project[currentId] =input.currentTarget.value;
       }
       
       this.setState({project: project})
    }
   handleDelete = async (id)=>{
    const resp = await fetch("http://localhost:3457/projects/"+ id,{
        method: "DELETE",
      
    })
    if(resp.ok){
        alert("Project with id "+ id + " deleted")
    }
       
   }
    
    render(){
      
        return(
            <>
            
            <Container style={{marginTop: "50px"}}>
            <Jumbotron>
               <h1>List Of All Project with details</h1> 
               <div style={{ display: "flex"}} onClick={this.handleShow}><Button>Add Project</Button></div>       
            </Jumbotron>
            
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
                {this.state.Projects.map(project=>(
                    
                    <tbody key={project._id}>
                    <tr>
                    <td>{project._id}</td>
                    <td>{project.projectname}</td>
                    <td>{project.description}</td>
                    <td>{project.repourl}</td>
                    <td>{project.liveurl}</td>
                    <td>{project.studentid}</td>
                    <td><RiDeleteBin6Line size={20} onClick={()=>this.handleDelete(project._id)}/></td>
                    <td><FiEdit size={20} /></td>
                    </tr>
                    
                </tbody>
                ))}
               
                </Table>
                <span> <strong>Total Project: {this.state.totalProject}</strong></span>
            </Container>
                 
            <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add New Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col>
                                <Form.Control type="text" id="projectname" 
                                placeholder="Project name"
                                value={this.state.project.projectname}
                                onChange={this.handleChange}/>
                                </Col>
                                <Col>
                                <Form.Control type="text" id="description"
                                placeholder="Description" 
                                value={this.state.project.description}
                                onChange={this.handleChange}/>
                                </Col>
                                
                            </Row>
                            <Row>
                                <Col>
                                <Form.Control type="email" id="liveurl" 
                                placeholder="Live Url"
                                value={this.state.project.liveurl}
                                onChange={this.handleChange}/>
                                </Col>
                                <Col>
                                <Form.Control type="text"  id="repourl" 
                                placeholder="Repo Url" 
                                value={this.state.project.repourl}
                                onChange={this.handleChange}/>
                                </Col>
                                
                            </Row>
                            <Row>
                                <Col>
                                <Form.Control type="number" id="studentid" 
                                placeholder="Student ID"
                                value={this.state.project.studentid}
                                onChange={this.handleChange}/>
                                </Col>
                                
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.saveProject}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
          
           </>
        )
    }
}

export default Project;