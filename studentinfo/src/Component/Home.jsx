import React, {Component} from 'react';
//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import  Row from 'react-bootstrap/Row';
import  Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'
import {connect} from 'react-redux'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Table from 'react-bootstrap/Table'


const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setLoading: () =>
    dispatch({
      type: "SET_LOADING",
      payload: true
      
    }),
  endLoading: () =>
    dispatch({
      type: "STOP_LOADING",
      payload: false
      
    }),
});
class Home extends Component {
    
    state={
        students: [],
        Total: 0,
        LastFiveProject: [],
        totalProject: 0,
        limit: 5,
        //isLoading: true
    }
    
    componentDidMount = async () =>{
        
        const response = await fetch("http://localhost:3456/students")
        const data = await response.json()
        
        console.log(data)
        this.setState({
            students: data.Students,
            Total: data.Total,
           //isLoading: this.props.isLoading()
        })

        const resp = await fetch("http://localhost:3456/projects")
        const project = await resp.json()
        this.setState({
            
            totalProject: project.total,
            //isLoading:  this.props.isLoading()
        })
        
        const limit= this.state.limit
        const total = this.state.totalProject
        const skip = total - limit
        console.log("skip", skip)
        console.log("total", total)
        const res = await fetch(`http://localhost:3456/projects?limit=${limit}&offset=${skip}`)
        
        const lastPro =await res.json()
        this.setState({
            LastFiveProject: lastPro.projects
        })
        this.props.endLoading()
    }
    
    render(){
        console.log(this.props)
        return(
            <>
            
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
            {
          this.props.isLoading && (
            
              <div className="ml-2">
                <Spinner animation="border" variant="success" />
              </div>
           
           )
        }
            {/* {this.props.endLoading} */}
              {this.state.students.map(student=>(
                  <Col md={4} sm={6} className="mb-4"> 
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
                { this.props.isLoading && (
            
            <div className="ml-2">
              <Spinner animation="border" variant="success" />
            </div>
         
         )
      }
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);