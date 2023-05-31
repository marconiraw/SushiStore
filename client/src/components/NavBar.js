import React, { useContext } from "react";
import { Context } from "../index";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE, ORDER_ROUTE} from "../utils/consts";
import Button from 'react-bootstrap/Button';
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom';
import { Col, Image, Row } from "react-bootstrap";
import logo from '.././favicon.ico'

const NavBar = observer( () => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        history.push(SHOP_ROUTE)
    }

    return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white', textDecoration: 'none'}} to = {SHOP_ROUTE}>
                    <Image className='mr-3' width={32} height={32} src={logo}/> SushiStore
                </NavLink>
                    {user.isAuth ?
                            <Nav className="ml-auto" style={{color: "white"}}>
                                {user.user.role === 'ADMIN' ? 
                                        <Row className='mr-2'>
                                            <Col ml={1}>
                                                <Button 
                                                    variant="outline-warning"
                                                    onClick={() => history.push(ADMIN_ROUTE)}
                                                    style={{width:150}}
                                                >
                                                    Адмін Панель
                                                </Button>
                                            </Col>

                                            <Col>
                                            <Button 
                                                variant="outline-warning"
                                                onClick={()=> history.push(ORDER_ROUTE)}
                                            >
                                                Замовлення
                                            </Button>
                                            </Col>

                                            <Col>
                                                <Button 
                                                    variant="outline-success"
                                                    onClick={()=> history.push(BASKET_ROUTE)}
                                                >
                                                    Кошик
                                                </Button>
                                            </Col>
                                
                                            <Col>
                                                <Button 
                                                    variant="outline-danger"
                                                    onClick={() => logOut()}
                                                >
                                                    Вийти
                                                </Button> 
                                            </Col>
                                        </Row>
                                : 
                                    <Row >
                                        <Col>
                                            <Button 
                                                variant="outline-warning"
                                                onClick={()=> history.push(ORDER_ROUTE)}
                                            >
                                                Замовлення
                                            </Button>
                                        </Col>

                                        <Col>
                                            <Button 
                                                variant="outline-success"
                                                onClick={()=> history.push(BASKET_ROUTE)}
                                            >
                                                Кошик
                                            </Button>
                                        </Col>
                                    
                                        <Col>
                                            <Button 
                                                variant="outline-danger"
                                                onClick={() => logOut()}
                                            >
                                                Вийти
                                            </Button> 
                                        </Col>
                                    </Row>
                                }
                            </Nav>
                        :
                        <Nav className="ml-auto" style={{color: "white"}}>
                            <Button variant="outline-secondary" onClick = {() => history.push(LOGIN_ROUTE)}>Авторизація</Button>
                        </Nav>
                    }        
            </Container>         
        </Navbar>
        
       
    );
});

export default NavBar;