import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ListGroup from "react-bootstrap/ListGroup";
import RemoveType from './RemoveType';
import { Container } from 'react-bootstrap';

const TypeBar = observer(() => {
    const {dish} = useContext(Context)
    const {user} = useContext(Context)

    var visibilityState = dish.selectedType.id ? "visible" : "hidden"

    return (
    <Container>
        {visibilityState === "visible" && user.user.role === 'ADMIN' ?
            [<ListGroup>
            
                {dish.types.map(type =>
                    <ListGroup.Item
                        style={{cursor: 'pointer'}}
                        active={type.id === dish.selectedType.id}
                        onClick={() => dish.setSelectedType(type)}
                        key={type.id}
                    >
                        {type.name}
                    </ListGroup.Item>
                )}
            </ListGroup>,
            <RemoveType/>]
        :
            <ListGroup>
            
                {dish.types.map(type =>
                    <ListGroup.Item
                        style={{cursor: 'pointer'}}
                        active={type.id === dish.selectedType.id}
                        onClick={() => dish.setSelectedType(type)}
                        key={type.id}
                    >
                        {type.name}
                    </ListGroup.Item>
                )}
            </ListGroup>
        }
        
    </Container>
    );
});

export default TypeBar;
