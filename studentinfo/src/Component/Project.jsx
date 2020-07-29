import React, {Component} from 'react';

import Container from 'react-bootstrap/Container'

import Jumbotron from 'react-bootstrap/Jumbotron'
import Table from 'react-bootstrap/Table'

class Project extends Component {
    
    state={
      
        Projects: [],
        totalProject: 0,
        
    }
    
    componentDidMount = async () =>{
      

        const resp = await fetch("http://localhost:3457/projects")
        const project = await resp.json()
        this.setState({
            
            totalProject: project.total,
            Projects: project.projects
        })
        
       
    }
    
    render(){
      
        return(
            <>
            
            <Container style={{marginTop: "50px"}}>
            <Jumbotron>
               <h1>List Of All Project with details</h1>     
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
                    </tr>
                    
                </tbody>
                ))}
               
                </Table>
                <span> <strong>Total Project: {this.state.totalProject}</strong></span>
            </Container>
                  
                
                

          
           </>
        )
    }
}

export default Project;