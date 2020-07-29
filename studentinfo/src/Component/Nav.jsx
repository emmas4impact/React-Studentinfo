import React, {Component} from 'react'
import Nav from 'react-bootstrap/Nav'

import { Link} from 'react-router-dom';

class NavItem extends Component {
    render(){
        return(
            <>
            
            <Nav variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Link to="/home" className="nav-link">Home</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/students" className="nav-link">Students</Link>
                    {/* <Nav.Link eventKey="link-1">Students</Nav.Link> */}
                </Nav.Item>
                <Nav.Item>
                    <Link to="/projects" className="nav-link">Projects</Link>
                    {/* <Nav.Link eventKey="link-2">
                   Projects
                    </Nav.Link> */}
                </Nav.Item>
            </Nav>
            
            </>
        )
    }
}

export default NavItem;