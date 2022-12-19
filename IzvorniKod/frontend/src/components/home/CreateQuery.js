import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ButtonGroup, Form, ModalFooter } from "react-bootstrap";

export default function CreateQuery() {
  const [query, setQuery] = useState({
    opis: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [count, setCount] = React.useState(0);
  function handleCount(event) {
    setCount(event.target.value.length);
  }

  function handleMultipleFun(event) {
    handleCount(event);
    setQuery((prevQuery) => {
      return { ...prevQuery, [event.target.name]: event.target.value }; //posto ima vise inputova, treba ih se razlikovati po name-u => to je jedan od parametara koji je sacuvan u event.target
    });
  }

  function optionSubmitForm() {
    setShow(false);

    const data = {
      poruka: query.opis,
    };

    console.log(data);
  }

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Pošalji upit!
      </Button>

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
          <Modal.Title id="contained-modal-title-vcenter">
            Kreiraj upit!
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={optionSubmitForm}>
          <Modal.Body>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Poruka vlasniku oglasa:</Form.Label>
              <Form.Control
                name="opis"
                as="textarea"
                rows="3"
                onChange={handleMultipleFun}
                maxLength={255}
                minLength={20}
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
                  Cancel
                </Button>
                <Button variant="success" type="submit">
                  Submit
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
}
