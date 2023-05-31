import React, {useContext, useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import DropDown from 'react-bootstrap/DropDown';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { observer } from 'mobx-react-lite';
import { createOrder } from '../../http/orderAPI';


const CreateOrder = observer(({show, onHide}) => {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [delivery, setDelivery] = useState('')
    const [address, setAddress] = useState('')
    const [paytype, setPayType] = useState('')

    const addOrder = () => {
        if (!name) {
            alert(`Заповніть поле "Назва"!`)
            return
        }
        if (!phone) {
            alert(`Заповніть поле "Номер телефону"!`)
            return
        }
        if (!address) {
            alert(`Заповніть поле "Адреса доставки"!`)
            return
        }
        if (!paytype) {
            alert(`Заповніть поле "Тип оплати"!`)
            return
        }
        if (delivery == "Кур'єр" && address == "Самовивіз"){
            alert('Введено некоректну адресу доставки!')
            return
        }

        const formData = new FormData()

        formData.append('name', name)
        formData.append('phone', phone)
        formData.append('address', address)
        formData.append('paytype', paytype)

        createOrder(formData).then(data => onHide())
        window.location.reload()
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
                Створити нове замовлення
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
               <Form.Control className='mt-3'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ваше ім'я..."
               />
               <Form.Control className='mt-3'
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder='Ваш номер телефону...'
               />
               <Row>
                    <Col md="auto">
                        <DropDown className='mt-3'>
                        <DropDown.Toggle>{delivery || "Оберіть тип одержання"}</DropDown.Toggle>
                            <DropdownMenu>
                                    <DropdownItem 
                                        onClick={() => {
                                            setDelivery('Самовивіз')
                                            setAddress('Самовивіз')
                                        }}
                                    >
                                        Самовивіз
                                    </DropdownItem>

                                    <DropdownItem 
                                        onClick={() => {
                                            setDelivery("Кур'єр")
                                            setAddress('')
                                        }}
                                    > 
                                        Кур'єр
                                    </DropdownItem>
                            </DropdownMenu>
                        </DropDown>
                    </Col>
                    <Col>
                        {delivery === 'Самовивіз' || delivery === '' ?
                            <Form.Control className='mt-3'
                                disabled
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                placeholder='Тут могла бути ваша адреса...'
                            />
                            :
                            <Form.Control className='mt-3'
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                placeholder='Адреса доставки...'
                            />
                        }
                        
                    </Col>
                </Row>
                {delivery === "Кур'єр" ?
                <div className='mt-2'>Ціна доставки: 50 гривень</div>:[]}
               <DropDown className='mt-3'>
                    <DropDown.Toggle>{paytype || "Оберіть тип оплати"}</DropDown.Toggle>
                    <DropdownMenu>
                            <DropdownItem 
                                onClick={() => setPayType('Готівка')}
                            >
                                Готівка
                            </DropdownItem>

                            <DropdownItem 
                                onClick={() => setPayType('Карта')}
                            >
                                Карта
                            </DropdownItem>
                    </DropdownMenu>
               </DropDown>
               <hr/>
               <div className='mt-0'>Увага! Оплата здійснюється на місці одержання!</div>
               <div className='mt-0'>Наша адреса: Київ, вул. Верховинна 56/2</div>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='outline-danger' onClick={onHide}>Закрити</Button>
            <Button variant='outline-success' onClick={addOrder}>Створити</Button>
        </Modal.Footer>
    </Modal>
    );
});

export default CreateOrder;