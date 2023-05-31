import React, { useContext, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { changeType } from '../../http/typeAPI';
import { Context } from '../..';


const ChangeType = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const {dish} = useContext(Context)

    const change = () => {
        if (!value){
            alert('Заповніть поле "Назва"!')
            return
        }
        const formData = new FormData()
        formData.append('name', value)
        changeType(dish.selectedType.id, formData).then(data => {
            setValue('')
            onHide()
            window.location.reload()
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
                Змінити тип
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder={"Введіть оновлену назву типу..."}
                />
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='outline-danger' onClick={onHide}>Закрити</Button>
            <Button variant='outline-success' onClick={change}>Змінити</Button>
        </Modal.Footer>
    </Modal>
    )
}

export default ChangeType;