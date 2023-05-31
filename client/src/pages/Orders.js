import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Context } from '../index';
import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { getOrder } from '../http/orderAPI';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { ORDER_ROUTE } from '../utils/consts';
import OrderPages from '../components/OrderPages';

const Orders = observer(() => {
  const {order} = useContext(Context)
  const {user} = useContext(Context)

  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const [viewType, setViewType] = useState(false)


  function stop(){
    setLoading(false)
  }

  function click(){
    if (viewType){
      order.setPage(1)
      setViewType(false)
    } else {
      order.setPage(1)
      setViewType(true)
    }
  }

  useEffect(() =>{
      user.user.role === 'ADMIN' ?
        viewType ?
          getOrder(order.page, order.limit).then(data => {
            order.setAllOrders(data.oneUser.rows)
            order.setTotalCount(data.oneUser.count)
          }).finally(setTimeout(stop, 1000))
        :
          getOrder(order.page, order.limit).then(data => {
            order.setAllOrders(data.allUsers.rows)
            order.setTotalCount(data.allUsers.count)
          }).finally(setTimeout(stop, 1000))
      :
        getOrder(order.page, order.limit).then(data => {
          order.setAllOrders(data.oneUser.rows)
          order.setTotalCount(data.oneUser.count)
        }).finally(setTimeout(stop, 1000))
  }, [viewType, order.page])

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

  return (
    <Container className="min-vh-100 d-flex flex-sm-column mt-3">
      {user.user.role === 'ADMIN' ?
        <Form>
        <Form.Check
          type="switch"
          id="custom-switch"
          label={viewType ? "Мої замовлення" : "Усі замовлення"}
          onChange={()=> click()}
        />
        </Form>
      :
        []
      }
      
      {order.totalCount === 0 ?
        <Container className="min-vh-100 d-flex flex-sm-column  align-items-center mt-3">
          <h1 className="pb-2">Замовлень немає ☹</h1>
        </Container>
      :
      <Container>
        {order.allOrders.map(oneOrder =>
        <Container key={oneOrder.id}> 
          <Card text='light' style={{cursor:'pointer'}} bg={color(oneOrder.status)} onClick={() => history.push(ORDER_ROUTE +  '/' + oneOrder.id)}>
          <Card.Header>{oneOrder.status}</Card.Header>
            <Card.Body>
              <Card.Title>Замовлення №{oneOrder.id}</Card.Title>
            </Card.Body>
          </Card>
          <hr/>
          </Container>
        )}
      </Container>
      }
      <OrderPages/>
    </Container>
  );
});

export default Orders;