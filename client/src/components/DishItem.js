import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Card from 'react-bootstrap/esm/Col';
import Image from 'react-bootstrap/esm/Image'
import {useHistory} from 'react-router-dom';
import {DISH_ROUTE} from '../utils/consts';


const DishItem = ({dish}) => {
    const history = useHistory()
    return (
        <Col md={4} className='mt-3' onClick={() => history.push(DISH_ROUTE + '/' + dish.id)}>
            <Card style={{width:250, cursor:'pointer'}} border={"light"}>
                <Image className='rounded-5' width={250} height={150} src={process.env.REACT_APP_API_URL + dish.img}/>
                <div>{dish.name}</div>
                <div>{dish.price} грн</div>
            </Card>
        </Col>
    );
};

export default DishItem;
