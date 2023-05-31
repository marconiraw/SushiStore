import React, { useContext, useState } from 'react'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { Context } from '..';
import { removeType } from '../http/typeAPI';
import ChangeType from './modals/ChangeType';

const RemoveType = () => {
    const {dish} = useContext(Context)

    const [typeVisible, setTypeVisible] = useState(false)

    const del = () =>{
        removeType(dish.selectedType.id)

        window.location.reload()
    }
    
    return(
        <Container >
            <hr/>
            <Stack className='flex-sm-column' gap={2}>
                <Button
                    variant='outline-danger'
                    onClick={()=> del()}
                    >
                        Видалити тип
                </Button>
                <Button 
                    onClick={() => setTypeVisible(true)} 
                    variant='outline-dark' 
                    >
                        Змінити тип
                </Button>
            </Stack>
            <ChangeType show={typeVisible} onHide={() => setTypeVisible(false)}/>
        </Container>
    );
};

export default RemoveType;