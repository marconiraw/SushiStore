import React, {useContext} from 'react';
import Row from 'react-bootstrap/esm/Row';
import DishItem from './DishItem';
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const DishList = observer(() => {
    const {dish} = useContext(Context)
    return (
        <Row className='md-3'>
            {dish.dishes.map(dish =>
                <DishItem key={dish.id} dish={dish}/>
            )}
        </Row>
    );
});

export default DishList;
