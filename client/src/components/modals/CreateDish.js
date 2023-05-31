import React, {useContext, useState, useEffect} from 'react'
import {Context} from "../../index";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DropDown from 'react-bootstrap/DropDown';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import {createDish} from "../../http/dishAPI";
import {fetchTypes} from "../../http/typeAPI";
import { observer } from 'mobx-react-lite';


const CreateDish = observer(({show, onHide}) => {
    const {dish} = useContext(Context)

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState ([])

    useEffect(() => {
        fetchTypes().then(data => dish.setTypes(data))
    }, [])

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const addDish = () => {
        if (!dish.selectedType.name){
            alert(`Оберіть тип товару!`)
            return
        }
        if (!name){
            alert(`Заповніть поле "Назва"!`)
            return
        }
        if (!price){
            alert(`Заповніть поле "Ціна"!`)
            return
        }
        if (!file){
            alert(`Оберіть оновлений файл!`)
            return
        }
        if (file.type.split('/')[0] !== 'image'){
            alert('Обраний файл не є зображенням!')
            return
        }

        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('typeId', dish.selectedType.id)
        formData.append('info', JSON.stringify(info))
        formData.append('img', file)
        createDish(formData).then(data => onHide())
    }

    const addInfo= () => {
        setInfo([...info, {title: '', description:'', number: Date.now()}])
    }

    const delInfo= (number) => {
        setInfo(info.filter(i => i.number !== number))
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
                Додати товар
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
               <DropDown>
                    <DropDown.Toggle>{dish.selectedType.name || "Оберіть тип товару"}</DropDown.Toggle>
                    <DropdownMenu>
                        {dish.types.map(type =>
                            <DropdownItem 
                                onClick={() => dish.setSelectedType(type)} 
                                key={type.id}
                            >
                                {type.name}
                            </DropdownItem>
                        )}
                    </DropdownMenu>
               </DropDown>
               <Form.Control className='mt-3'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='Назва товару...'
               />
               <Form.Control className='mt-3'
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    placeholder='Ціна товару...'
                    type='number'
               />
               <Form.Control className='mt-3'
                    type='file'
                    onChange={selectFile}
               />
               <hr/>
               <Button variant='outline-dark' onClick={addInfo}>Додати склад</Button>

               {info.map(i =>
                    <Row className='mt-3' key={i.number}>
                        <Col md={4}>
                            <Form.Control
                                value={i.title}
                                onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                placeholder="Інгредієнт або товар"
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                value={i.description}
                                onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                placeholder="Вага чи кількість"
                            />
                        </Col>
                        <Col md={4}>
                            <Button variant={'outline-danger'} onClick={() => delInfo(i.number)}>Видалити</Button>
                        </Col>
                    </Row>
                )}
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='outline-danger' onClick={onHide}>Закрити</Button>
            <Button variant='outline-success' onClick={addDish}>Додати</Button>
        </Modal.Footer>
    </Modal>
    );
});

export default CreateDish;