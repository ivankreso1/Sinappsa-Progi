import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ButtonGroup, Form, ModalFooter } from "react-bootstrap";
import { deleteDataAuth } from "../../scripts/util";

export default function DeleteAd(props) {
  const [count, setCount] = React.useState(0);
  const [show, setShow] = useState(false);
  const [deletingShow, setDeletingShow] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState({
    opis: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleDeletingAlertClose = () => setDeletingShow(false);
  const handleDeletingAlertShow = () => setDeletingShow(true);

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

    handleDeletingAlertShow();

    deleteDataAuth(`oglasi/${props.props.ad.id}`, data).then((res) => {
      handleDeletingAlertClose();

      if (res.error) {
        alert("Oglas nije moguće obrisati!");
      } else {
        props.props.onAdDelete(props.props.ad);

        alert("Oglas uspješno obrisan!");
      }
    });

    setCount(0);
    setShow(false);
  }

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Obriši oglas
      </Button>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Razlog brisanja oglasa</Modal.Title>
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
                placeholder={"Poruka"}
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
                  Odustani
                </Button>
                <Button
                  variant="success"
                  type="submit"
                  disabled={count === 0 ? true : false}
                >
                  Obriši
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={deletingShow}
        onHide={handleDeletingAlertClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Brisanje oglasa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Brisanje u tijeku...</Modal.Body>
      </Modal>
    </>
  );
}
