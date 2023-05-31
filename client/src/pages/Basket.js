import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Context } from '../index';
import { getBasket , delFromBasket, cleanBasket } from '../http/basketAPI';
import { Button, Card, Col, Container, Row, Stack } from 'react-bootstrap'
import { createOrder } from '../http/orderAPI';
import CreateOrder from '../components/modals/CreateOrder';

const Basket = observer(() => {
  const {dish} = useContext(Context)

  const [orderVisible, setOrderVisible] = useState(false)

    useEffect(() => {
        getBasket().then(data => dish.setBaskets(data))
    }, [])

    let prices = 0;

    {dish.basket.map(price =>
        prices += Number(price.dish.price)
    )}

    const clean = () => {
      cleanBasket()
      window.location.reload()
    }
    const del = (id) => {
      delFromBasket(id)
      window.location.reload()
    }

  return (
    <Container className="min-vh-100 d-flex flex-sm-column align-items-center mt-3">
      {prices === 0 ?
        <h1 className="pb-2">Кошик порожній ☹</h1>
      :
        <Container className=" flex-sm-column  align-items-center">
          <h1 className="pb-2">Кошик</h1>
          <Button variant='outline-danger' onClick={()=> clean()}>Очистити кошик</Button>
          <Card className="mt-2 d-flex w-100 p-2 justify-content-center mb-2" >
            {dish.basket.map(product =>
              <Stack direction="horizontal" className='mt-2' gap={3}>
                <img className='rounded-2' src={process.env.REACT_APP_API_URL + product.dish.img} width={50} />
                <h4 className="pl-3 ml-3">{product.dish.name}</h4>
                <h4 className="font-weight-light ms-auto">{product.dish.price} грн</h4>
                <div className="vr" />
                <Button
                  variant="outline-danger"
                  onClick={()=> del(product.id)}
                  >
                    Видалити
                </Button>
              </Stack>
            )}
          </Card>
          <Card className=" p-2  mb-2">
            <h4 className="pr-2">Усього: {prices} гривень</h4>
            <div>Кур'єрська доставка сплачується додатково!</div>
          </Card>
            <Button onClick={() => setOrderVisible(true)}>Створити замовлення</Button>
            <CreateOrder show={orderVisible} onHide={() => setOrderVisible(false)}/>
        </Container>
      }
    </Container>
  );
});

export default Basket;