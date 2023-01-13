import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ButtonGroup, Form, ModalFooter } from "react-bootstrap";
import { putDataAuth } from "../../scripts/util";

export default function GradeStudent(props) {
  const [show, setShow] = useState(false);
  const [grade, setGrade] = useState({
    ocjena: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleGradeChange(event) {
    setGrade((prevGrade) => {
      return { ...prevGrade, [event.target.name]: event.target.value };
    });
  }

  function optionSubmitForm(event) {
    event.preventDefault();

    const data = {
      idUpita: props.props.query.id,
      ocjena: grade.ocjena,
    };

    putDataAuth("upiti/ocijeni", data).then((data) => {
      if (data.error) {
        alert(data.message);
      } else {
        putDataAuth(
          "upiti/" + props.props.query.id + "/novoStanje?stanjeUpita=PRIHVACEN",
          {}
        ).then((res) => {
          setShow(false);
          window.location.reload(false);
        });
      }
    });
  }

  return (
    <>
      <Button
        key="gumb1"
        className="mb-3"
        variant="secondary"
        onClick={handleShow}
      >
        Ocijeni uslugu
      </Button>

      <Modal
        key="modal"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
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
                key="ocjena1"
                inline
                label="1"
                name="ocjena"
                type="radio"
                value="1"
                onChange={handleGradeChange}
              />
              <Form.Check
                key="ocjena2"
                inline
                label="2"
                name="ocjena"
                type="radio"
                value="2"
                onChange={handleGradeChange}
              />{" "}
              <Form.Check
                key="ocjena3"
                inline
                label="3"
                name="ocjena"
                type="radio"
                value="3"
                onChange={handleGradeChange}
              />{" "}
              <Form.Check
                key="ocjena4"
                inline
                label="4"
                name="ocjena"
                type="radio"
                value="4"
                onChange={handleGradeChange}
              />{" "}
              <Form.Check
                key="ocjena5"
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
                  Odustani
                </Button>
                <Button
                  key="gumbic2"
                  variant="success"
                  type="submit"
                  disabled={!grade.ocjena ? true : false}
                >
                  Ocijeni
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
