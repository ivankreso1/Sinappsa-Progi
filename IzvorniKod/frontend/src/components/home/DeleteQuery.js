import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ButtonGroup, Form, ModalFooter } from "react-bootstrap";

export default function CreateQuery(props) {
    let currentInfo = JSON.parse(localStorage.getItem("personInfo"));
    const [count, setCount] = React.useState(0);
    const [show, setShow] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState({
        opis: "",
    });

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    };

    function handleCount(event) {
        setCount(event.target.value.length);
    }

    function handleMessageChange(event) {
        handleCount(event);
        setDeleteMessage((prevQuery) => {
            return { ...prevQuery, [event.target.name]: event.target.value };
        });
    }

    function optionSubmitForm(event) {
        event.preventDefault();

        const data = {
            poruka: deleteMessage.opis,
        };

        console.log(deleteMessage)

        setCount(0);
        setShow(false);
    }

    /*function handleMouseHover() {
        if (!count) console.log("ERROR DISPLAYED")
        else console.log("NO error")
    }*/

    return (
        <>
            <div className="delete-ad-button-container"
            style = {
                {
                    display: "flex",
                    justifyContent: "end"
                }
            }>
                <Button
                    variant="danger"
                    onClick={handleShow}
                    style = {
                        {
                            width: "20%",
                            margin: "5px"
                        }
                    }
                >
                    Obriši oglas
                </Button>
            </div>

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}
                backdrop="static" //onemogucen izlaz klikom na pozadinu
                keyboard={false} //onemogucen izlaz pomocu escape key-a
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Razlog brisanja oglasa
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={optionSubmitForm}>
                        <Form.Group>
                            <Form.Label>Poruka vlasniku oglasa:</Form.Label>
                            <Form.Control
                                name="opis"
                                as="textarea"
                                rows="3"
                                onChange={handleMessageChange}
                                maxLength={255}
                                minLength={10}
                                required={true}
                                placeholder = {"Poruka"}
                            />
                        </Form.Group>
                        <div>
                            <p>
                                {count}/{255}
                            </p>
                        </div>
                        <ModalFooter>
                            <ButtonGroup>
                                <Button variant="danger" onClick={handleClose}>
                                    Otkaži
                                </Button>
                                <Button variant="success" type="submit"
                                disabled = {count === 0 ? true : false}
                                //onMouseOver = {handleMouseHover}
                                >
                                    Obriši
                                </Button>
                            </ButtonGroup>
                        </ModalFooter>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
