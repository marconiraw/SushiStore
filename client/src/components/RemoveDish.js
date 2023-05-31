import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Card from 'react-bootstrap/esm/Col';
import {removeDish} from "../http/dishAPI";
import Button from 'react-bootstrap/Button';
import {SHOP_ROUTE} from '../utils/consts';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import {  fetchOneDish } from '../http/dishAPI';


const RemoveDish = () => {
    const params = useParams()
    const dishId = params.id
    const history = useHistory()

    const [dish, setDish] = useState({info:[]})

    useEffect(() => {
        fetchOneDish(dishId).then(data => setDish(data))
    }, [])

    const delDish = (id) => {
        removeDish(id)
        history.push(SHOP_ROUTE)
        window.location.reload()
    }

    return (
            <Card>
            <Button 
                variant='outline-danger'
                className='mt-3'
                onClick={() => delDish(dishId)}
            >
                Видалити товар
            </Button>
        </Card>
    );
};

export default RemoveDish;
