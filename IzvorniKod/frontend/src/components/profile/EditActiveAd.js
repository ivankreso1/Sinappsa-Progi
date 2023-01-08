import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ButtonGroup, Form, ModalFooter } from "react-bootstrap";
import React, { useState } from "react";
import { putDataAuth } from "../../scripts/util";

export default function EditActiveAd(props) {
  const [show, setShow] = useState(false);
  const [count, setCount] = React.useState(0);
  const [editActAd, setEditActAd] = useState({
    naslov: props.props.ad.naslov,
    opis: props.props.ad.opis,
  });

  const handleClose = (event) => {
    setShow(false);
    editActAd.naslov = props.props.ad.naslov;
    editActAd.opis = props.props.ad.opis;
    handleCount(event);
  };
  const handleShow = () => {
    setShow(true);
    setCount(props.props.ad.opis.length);
  };

  function handleCount(event) {
    setCount(event.target.value.length);
  }

  function handleMultipleFun(event) {
    handleCount(event);
    handleAdChange(event);
  }

  function handleAdChange(event) {
    setEditActAd((prevEditActAd) => {
      return { ...prevEditActAd, [event.target.name]: event.target.value };
    });
  }

  function optionSubmitForm(event) {
    event.preventDefault();
    const data = {
      naslov: editActAd.naslov,
      opis: editActAd.opis,
    };
    putDataAuth("/oglasi/" + props.props.ad.id, data).then((res) => {
      if (res.error) {
        alert(res.message);
      }
    });

    window.location.reload(false);
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
                value={editActAd.naslov}
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
                value={editActAd.opis}
                required={true}
                maxLength={255}
                minLength={10}
                onChange={handleMultipleFun}
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
        </Modal.Body>
      </Modal>
    </>
  );
}
