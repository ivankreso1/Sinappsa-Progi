import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ButtonGroup, Form, ModalFooter } from "react-bootstrap";
import { putDataAuth } from "../../scripts/util";

export default function QueryResponse(id) {
  const [show, setShow] = useState(false);
  const [queryResponse, setQueryResponse] = useState({
    odgovor: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

    var uriZaSlanje =
      "/upiti/" + id.id + "/novoStanje?stanjeUpita=" + data.odgovor;

    putDataAuth(uriZaSlanje, {}).then((res) => {
      if (res.error) {
        alert(res.message);
      } else {
        setShow(false);
        window.location.reload(false);
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
        Odgovori na upit
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
            Odgovor na upit:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body key="tijelo">
          <Form key="forma" onSubmit={optionSubmitForm}>
            <div key="div" className="mb-3">
              <Form.Check
                key="ocjena"
                inline
                label="Ocjenjivanje usluge"
                name="odgovor"
                type="radio"
                value="CEKA_OCJENJIVANJE"
                onChange={handleQueryResponseChange}
              />
              <Form.Check
                key="odbijeno"
                inline
                label="Odbijanje usluge"
                name="odgovor"
                type="radio"
                value="ODBIJEN"
                onChange={handleQueryResponseChange}
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
                  disabled={!queryResponse.odgovor ? true : false}
                >
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
