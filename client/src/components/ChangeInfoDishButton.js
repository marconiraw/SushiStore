import React, {useState} from 'react';
import Card from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import ChangeInfoDish from './modals/ChangeInfoDish';
import { Container } from 'react-bootstrap';

const RemoveDish = () => {
    const [changeVisible, setChangeVisible] = useState(false)

    return (
        <Card>
            <Button 
                variant='outline-dark' 
                onClick={() => setChangeVisible(true)}
            >
                Змінити інформацію про товар
            </Button>

            <ChangeInfoDish show={changeVisible} onHide={() => setChangeVisible(false)}/>
        </Card>
    );
};

export default RemoveDish;
