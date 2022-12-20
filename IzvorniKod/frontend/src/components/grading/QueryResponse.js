import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ButtonGroup, Form, ModalFooter } from "react-bootstrap";

export default function CreateQuery(id) {
  const [show, setShow] = useState(false);
  const [queryResponse, setQueryResponse] = useState({
    odgovor: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  function handleQueryResponseChange(event) {
    setQueryResponse((prevQueryResponse) => {
      return { ...prevQueryResponse, [event.target.name]: event.target.value };
    });
  }

  function optionSubmitForm(event) {
    event.preventDefault();

    const data = {
      odgovor: queryResponse.odgovor,
    };

    console.log(data);
    setShow(false);
  }

  return (
    <>
      <Button className="mb-3" variant="secondary" onClick={handleShow}>
        Odgovori na upit!
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
            Odgovor na upit!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={optionSubmitForm}>
            <div className="mb-3">
              <Form.Check
                inline
                label="Ocjenjivanje"
                name="odgovor"
                type="radio"
                value="CEKA_OCJENJIVANJE"
                onChange={handleQueryResponseChange}
              />
              <Form.Check
                inline
                label="Odbijanje"
                name="odgovor"
                type="radio"
                value="ODBIJEN"
                onChange={handleQueryResponseChange}
              />
            </div>

            <ModalFooter>
              <ButtonGroup>
                <Button variant="danger" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="success"
                  type="submit"
                  disabled={!queryResponse.odgovor ? true : false}
                >
                  Submit
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
