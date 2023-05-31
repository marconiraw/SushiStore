import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { Context } from '../index';
import DishList from '../components/DishList';
import Pages from '../components/Pages'
import TypeBar from '../components/TypeBar'
import {  fetchDishes } from '../http/dishAPI';
import { fetchTypes } from '../http/typeAPI';

const Shop = observer(() => {
  const {dish} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => dish.setTypes(data))
  }, [])

  useEffect( () => {
    fetchDishes(dish.selectedType.id, dish.page, dish.limit).then(data => {
      dish.setDishes(data.rows)
      dish.setTotalCount(data.count)
    })
  }, [dish.page, dish.selectedType])


  return (
    <Container className="min-vh-100">
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar/>
        </Col>

        <Col md={9}>
          <DishList/>
          <Pages/>
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;