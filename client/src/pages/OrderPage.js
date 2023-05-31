import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {  Redirect, useHistory, useParams} from 'react-router-dom/cjs/react-router-dom';
import { useContext } from 'react';
import { Context } from '../index';
import { Badge, Button, ButtonGroup, Card, Col, Container, Dropdown, Row, Spinner, Stack } from 'react-bootstrap'
import { changeStatus, delOrder, getOneOrder, getOneOrderInfo } from '../http/orderAPI';
import { ORDER_ROUTE } from '../utils/consts';


const OrderPage = observer(() => {
  const {order} = useContext(Context)
  const {user} = useContext(Context)
  const id = useParams()
  const [loading, setLoading] = useState(true)

  function stop(){
    setLoading(false)
  }

  useEffect(() =>{
    getOneOrderInfo(id.id).then(oneOrder => {
      order.setOneOrder(oneOrder.order);
      order.setDishes(oneOrder.orderInfo);
    }).finally(setTimeout(stop, 1000))
  }, [])

  let prices = 0;

  {order.dishes.map(price =>
    prices += Number(price.dish.price)
  )}

  const change = (status) => {
    changeStatus(id.id, status).finally(window.location.reload())
  }

  if (loading){
    return <Spinner animation={"grow"}/>
  }

  function color(status){
    switch(status){
      case 'Нове':
        return 'primary'
      case 'Відхилено':
        return 'danger'
      case 'Прийняте':
        return 'info'
      case 'Готується':
        return 'warning'
      case 'В доставці':
        return 'secondary'
      case 'Виконано':
        return 'success'
    }
  }

  const del = () => {
    delOrder(id.id).finally(window.location.assign(ORDER_ROUTE))
  }

  return (
    <Container className="min-vh-100 d-flex flex-sm-column mt-3">
      {user.user.role === 'ADMIN' ? 
        <Stack direction='horizontal' gap={3}>
          <h2>Замовлення №{id.id}</h2>
          <Dropdown className='mr-2' as={ButtonGroup}>
            <Button variant={color(order.oneOrder.status)}><b>{order.oneOrder.status}</b></Button>

            <Dropdown.Toggle split variant={color(order.oneOrder.status)} id="dropdown-split-basic" />

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => change('Нове')}>Нове</Dropdown.Item>
              <Dropdown.Item onClick={() => change('Прийняте')}>Прийняте</Dropdown.Item>
              <Dropdown.Item onClick={() => change('Готується')}>Готується</Dropdown.Item>
              <Dropdown.Item onClick={() => change('B доставці')}>B доставці</Dropdown.Item>
              <Dropdown.Item onClick={() => change('Виконано')}>Виконано</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => change('Відхилено')}>Відхилено</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => del()}>Видалити</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Stack> 
      :
        <h2>Замовлення №{id.id} <Badge bg={color(order.oneOrder.status)}>{order.oneOrder.status}</Badge></h2>
      }
      <div>Ім'я: {order.oneOrder.name}</div>
      <div>Телефон: {order.oneOrder.phone}</div>
      <div>Адреса доставки: {order.oneOrder.address}</div>
      <div>Тип оплати: {order.oneOrder.paytype}</div>
      <hr/>
      <h5>Склад замовлення:</h5>

      <Card className="mt-2 d-flex w-100 p-2 justify-content-center mb-2" >
        {order.dishes.map(product =>
          <Stack direction="horizontal" className='mt-2' gap={3}>
            <img className='rounded-2' src={process.env.REACT_APP_API_URL + product.dish.img} width={50} />
              <h4 className="pl-3 ml-3">{product.dish.name}</h4>
              <h4 className="font-weight-light ms-auto">{product.dish.price} грн</h4>
          </Stack>
        )}
      </Card>
      <Card className=" p-2  mb-2">
        {order.oneOrder.address != 'Самовивіз' ?
          [<div className="pr-2">Сума товарів: {prices} гривень</div>,
          <div className="pr-2">Сума доставки: 50 гривень</div>,
          <hr/>,
          <h5 className="pr-2">До сплати: {prices + 50} гривень</h5>]
        :
          <h5 className="pr-2">До сплати: {prices} гривень</h5>
        }
      </Card>
    </Container>
  );
});

export default OrderPage;