import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";

const Footer = observer( () => {
    return(
        <Navbar sticky="top" bg="dark" variant="light">
            <Container className="justify-content-center align-items-center">
                <Nav style={{color: "white"}}>
                     <Row>
                        <Col>
                            Київ, Верховинна 56/2
                        </Col>
                        <Col>
                            0-800-123-123
                        </Col>
                        <Col>
                            sushistore@gmail.com
                        </Col>
                     </Row>
                </Nav>
            </Container>         
        </Navbar>
        
       
    );
});

export default Footer;