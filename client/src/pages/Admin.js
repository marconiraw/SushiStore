import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import {Context} from '../index'
import CreateDish from "../components/modals/CreateDish"
import CreateType from "../components/modals/CreateType"
import { SHOP_ROUTE } from '../utils/consts';


const Admin = () => {
  const {user} = useContext(Context)
  const history = useHistory()


  const [typeVisible, setTypeVisible] = useState(false)
  const [dishVisible, setDishVisible] = useState(false)
  return (
    <Container className='min-vh-100 d-flex flex-column'>
      {user.user.role === 'ADMIN' ?
        []
      :
        history.push(SHOP_ROUTE)
      }
      <Button onClick={() => setDishVisible(true)} variant='outline-dark' className='mt-2'>Додати товар</Button>
      <Button onClick={() => setTypeVisible(true)} variant='outline-dark' className='mt-2'>Додати тип</Button>

      <CreateDish show={dishVisible} onHide={() => setDishVisible(false)}/>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
    </Container>
  );
};

export default Admin;