import React, {Component} from 'react';
//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import  Row from 'react-bootstrap/Row';
import  Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import {Link} from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Table from 'react-bootstrap/Table'

class Home extends Component {
    
    state={
        students: [],
        Total: 0,
        LastFiveProject: [],
        totalProject: 0,
        limit: 5
    }
    
    componentDidMount = async () =>{
        const response = await fetch("http://localhost:3457/students")
        const data = await response.json()
        
        console.log(data)
        this.setState({
            students: data.Students,
            Total: data.Total
        })

        const resp = await fetch("http://localhost:3457/projects")
        const project = await resp.json()
        this.setState({
            
            totalProject: project.total
        })
        
        const limit= this.state.limit
        const total = this.state.totalProject
        const skip = total - limit
        console.log("skip", skip)
        console.log("total", total)
        const res = await fetch(`http://localhost:3457/projects?limit=${limit}&offset=${skip}`)
        
        const lastPro =await res.json()
        this.setState({
            LastFiveProject: lastPro.projects
        })
    }
    
    render(){
        console.log(this.state.LastFiveProject)
        return(
            <>
            <Nav variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link href="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Students</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">
                   Projects
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <Container style={{marginTop: "50px"}}>
            <Jumbotron>
                <h1>
                <img src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fd3v0px0pttie1i.cloudfront.net%2Fuploads%2Fuser%2Flogo%2F2760563%2Fopengraph_3b24453d.png%3Fsource%3Dopengraph"
                 alt="cover" style={{width: "100px", height: "100%", marginTop: "20px"}} />
                 Strive School </h1>
                <p>
                    This Page render the list of student in Strive school with short projects!
                </p>
                
            </Jumbotron>
            <Row>
                <Col md={3} className=" col col-md-4"> 
              {this.state.students.map(student=>(
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
            
            ))}
            </Col>
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
                {this.state.LastFiveProject.map(project=>(
                    
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
                  
                
                

          
           </>
        )
    }
}

export default Home;