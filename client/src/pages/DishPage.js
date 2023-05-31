import React, { useContext, useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/esm/Col';
import Image from 'react-bootstrap/esm/Image';
import Card from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/esm/Row';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import {  fetchOneDish } from '../http/dishAPI';
import {  addToBasket } from '../http/basketAPI';
import RemoveDish from '../components/RemoveDish';
import { Context } from "../index";
import ChangeInfoDishButton from '../components/ChangeInfoDishButton';
import { Stack } from 'react-bootstrap';

const DishPage = () => {
  const {user} = useContext(Context)

  const [dish, setDish] = useState({info:[]})
  const params = useParams()
  const dishId = params.id
  
  useEffect(() => {
      fetchOneDish(dishId).then(data => setDish(data))
  }, [])

  const add = () => {
    const formData = new FormData()
    formData.append('dishId', dishId)
    addToBasket(formData).then(response => alert(`Товар ` + dish.name + ` був доданий у ваш кошик!`))
  }

  return (
    <Container className='min-vh-100 mt-3'>
      <Row>
      <Col md={6}>
        <Image className='rounded-4' width={500} height={300} src={process.env.REACT_APP_API_URL + dish.img}/>

        <Card>
          <h3>{dish.price} грн</h3>

          <Button variant='outline-success' onClick={add}>
            Додати до кошика
          </Button>

          {user.user.role === 'ADMIN' ?
          <Stack gap={2}>
            <RemoveDish/>
            <ChangeInfoDishButton/>
          </Stack>
            :[]
          }
        </Card>
      </Col>

      <Col md={6}>
        <h2>{dish.name}</h2>
        <h4>Склад:</h4>
        {dish.info.map(info =>
          <Row className = 'm-0' key={info.id}>
            {info.title}: {info.description}г/шт
          </Row>
        )}
      </Col>
      </Row>
    </Container>
  );
};

export default DishPage;