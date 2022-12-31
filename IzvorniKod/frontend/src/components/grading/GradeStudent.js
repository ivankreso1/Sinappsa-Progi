import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ButtonGroup, Form, ModalFooter } from "react-bootstrap";
import { putDataAuth } from "../../scripts/util";

export default function GradeStudent(id) {
  const [show, setShow] = useState(false);
  const [grade, setGrade] = useState({
    ocjena: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  function handleGradeChange(event) {
    setGrade((prevGrade) => {
      return { ...prevGrade, [event.target.name]: event.target.value };
    });
  }

  function optionSubmitForm(event) {
    event.preventDefault();

    const data = {
      idUpita: id.id,
      ocjena: grade.ocjena,
    };
    console.log(data);

    putDataAuth("upiti/ocijeni", data).then((data) => {
      console.log(data);
      if (data.error) {
        alert(data.error.message);
      } else {
        putDataAuth(
          "/upiti/" + id.id + "/novoStanje?stanjeUpita=PRIHVACEN",
          {}
        );
      }
    });
    //setShow(false);
    window.location.reload(false);
  }

  return (
    <>
      <Button
        key="gumb1"
        className="mb-3"
        variant="secondary"
        onClick={handleShow}
      >
        Ocijeni uslugu!
      </Button>

      <Modal
        key="modal"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static" //onemogucen izlaz klikom na pozadinu
        keyboard={false} //onemogucen izlaz pomocu escape key-a
      >
        <Modal.Header key="header" closeButton>
          <Modal.Title key="naslov" id="contained-modal-title-vcenter">
            Ocijeni uslugu studenta - pomagača!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body key="tijelo">
          <Form key="forma" onSubmit={optionSubmitForm}>
            <div key="div" className="mb-3">
              <Form.Check
                key="ocjena"
                inline
                label="1"
                name="ocjena"
                type="radio"
                value="1"
                onChange={handleGradeChange}
              />
              <Form.Check
                key="ocjena"
                inline
                label="2"
                name="ocjena"
                type="radio"
                value="2"
                onChange={handleGradeChange}
              />{" "}
              <Form.Check
                key="ocjena"
                inline
                label="3"
                name="ocjena"
                type="radio"
                value="3"
                onChange={handleGradeChange}
              />{" "}
              <Form.Check
                key="ocjena"
                inline
                label="4"
                name="ocjena"
                type="radio"
                value="4"
                onChange={handleGradeChange}
              />{" "}
              <Form.Check
                key="ocjena"
                inline
                label="5"
                name="ocjena"
                type="radio"
                value="5"
                onChange={handleGradeChange}
              />
            </div>

            <ModalFooter key="podnozje">
              <ButtonGroup key="gumbici">
                <Button key="gumbic1" variant="danger" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  key="gumbic2"
                  variant="success"
                  type="submit"
                  disabled={!grade.ocjena ? true : false}
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
