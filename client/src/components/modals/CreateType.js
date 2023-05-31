import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createType } from '../../http/typeAPI';


const CreateType = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const addType = () => {
        if (!value){
            alert('Заповніть поле "Назва"!')
            return
        }
        createType({name: value}).then(data => {
            setValue('')
            onHide()
        })
    }

    return(
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Додати тип
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder={"Введіть назву типу..."}
                />
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='outline-danger' onClick={onHide}>Закрити</Button>
            <Button variant='outline-success' onClick={addType}>Додати</Button>
        </Modal.Footer>
    </Modal>
    )
}

export default CreateType;