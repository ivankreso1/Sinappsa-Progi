import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ButtonGroup, Form, ModalFooter } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditActiveAd() {
  let currentInfo = JSON.parse(localStorage.getItem("personInfo"));

  const [error, setError] = useState(""); //jel mi treba?
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [count, setCount] = React.useState(0);
  const [editActAd, setEditActAd] = useState({
    naslov: "",
    opis: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (!currentInfo.userName) {
      navigate("/login");
    }
    setShow(true);
  };

  function handleCount(event) {
    setCount(event.target.value.length);
  }

  function handleMultipleFun(event) {
    handleCount(event);
    setEditActAd((prevEditActAd) => {
      return { ...prevEditActAd, [event.target.name]: event.target.value };
    });
  }

  function optionSubmitForm(event) {
    event.preventDefault();

    const data = {
      poruka: editActAd.opis,
    };
  }
  function handleAdChange(event) {
    setEditActAd((prevEditActAd) => {
      return { ...prevEditActAd, [event.target.name]: event.target.value };
    });
  }

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Uredi oglas
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
            Uredi oglas!
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={optionSubmitForm}>
            <div className="mb-3">
              <Form.Label>Naslov oglasa</Form.Label>
              <Form.Control
                type="text"
                name="naslov"
                required="true"
                maxLength={255}
                minLength={5}
                onChange={handleAdChange}
              ></Form.Control>
            </div>

            <div className="mb-3">
              <Form.Label>Opis problema/ponude</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="opis"
                onChange={handleMultipleFun}
                maxLength={255}
                minLength={20}
                required="true"
              ></Form.Control>
              <div>
                <p>
                  {count}/{255}
                </p>
              </div>
            </div>
            <ModalFooter>
              <ButtonGroup>
                <Button variant="danger" onClick={handleClose}>
                  Odustani
                </Button>
                <Button variant="success" type="submit">
                  Pošalji
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </Form>
          <div className="error-message">{error}</div>
        </Modal.Body>
      </Modal>
    </>
  );
}
