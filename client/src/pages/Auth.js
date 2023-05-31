import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { NavLink , useHistory, useLocation} from 'react-router-dom/cjs/react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import Row from "react-bootstrap/Row";
import { registration, login } from '../http/userAPI';
import {observer} from "mobx-react-lite";
import { Context } from '../index';

const Auth = observer(() => {
  const {user} = useContext(Context)
  const history = useHistory()
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const click = async () => {
    if (!email){
      alert(`Заповніть поле "Email"!`)
      return
    }
    if (!password){
      alert(`Заповніть поле "Пароль"!`)
      return
    }
    let data;
    try {
      if (isLogin) {
        data = await login(email, password)
  
      } else {
        data = await registration(email, password)
      }
      user.setUser(data)
      user.setIsAuth(true)
      history.push(SHOP_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
    
  }

  return (
    <Container
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight - 54}}
    >
      <Card style={{width: 600}} className='p-5'>
        <h2 className='m-auto'>{isLogin ? 'Авторизація' : 'Реєстрація'}</h2>
        <Form className='d-flex flex-column'>
          <Form.Control
            className='mt-3'
            placeholder='Введіть ваш Email...'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <Form.Control
            className='mt-3'
            type='password'
            placeholder='Введіть ваш пароль...'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Form className={'d-flex justify-content-between mt-3 pl-3 pr-3'}>
            {isLogin ?
              <div>
                Немає акаунту? <NavLink to = {REGISTRATION_ROUTE}>Зареєструйся!</NavLink>
              </div>
              :
              <div>
                Вже зареєстровані? <NavLink to = {LOGIN_ROUTE}>Ввійдіть!</NavLink>
              </div>
            }
            

            <Button 
              variant='outline-success'
              onClick={click}
            >
            {isLogin ? 'Ввійти' : 'Реєстрація'}
            </Button>
          </Form>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;