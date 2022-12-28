import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ButtonGroup, Form, ModalFooter } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postDataAuth } from "../../scripts/util";

export default function CreateQuery(props) {
  let currentInfo = JSON.parse(localStorage.getItem("personInfo"));
  const [count, setCount] = React.useState(0);
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState({
    opis: "",
  });
  const navigate = useNavigate();

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
    setQuery((prevQuery) => {
      return { ...prevQuery, [event.target.name]: event.target.value };
    });
  }

  function optionSubmitForm(event) {
    event.preventDefault();

    const data = {
      poruka: query.opis,
    };

    postDataAuth(
      "upiti/" + currentInfo.id + "/" + props.props.ad.id,
      data
    ).then((res) => {
      if (res.error) {
        alert(res.message);
      }
    });

    setCount(0);
    setShow(false);
  }

  return (
    <>
      <Button
        variant="secondary"
        onClick={handleShow}
        disabled={
          props.props.ad.kreator.korisnickoIme === currentInfo.userName
            ? true
            : false
        }
      >
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
        <Modal.Body>
          <Form onSubmit={optionSubmitForm}>
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
                minLength={10}
                required={true}
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
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
