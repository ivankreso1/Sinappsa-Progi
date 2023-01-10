import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ButtonGroup, Form, ModalFooter } from "react-bootstrap";
import { postDataAuth } from "../../scripts/util";

class AddCourse extends Component {
  state = {
    show: false,
    ime: "",
    smjer: "",
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleSubmitForm = (e) => {
    e.preventDefault();

    postDataAuth("/kolegiji", {
      nazivKolegija: this.state.ime,
      smjer: this.state.smjer,
    }).then((res) => {
      if (res.error) {
        alert(res.message);
      } else {
        alert(`Kolegij ${this.state.ime} uspješno dodan!`);
      }
    });

    this.handleClose();
  };

  handleCourseDirectionChange = (e) => {
    this.setState({ smjer: e.target.value });
  };

  handleCourseNameChange = (e) => {
    this.setState({ ime: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <button
          className="btn btn-lg btn-block btn-success rounded-3 py-4 mb-3 bg-op-6 roboto-bold"
          onClick={this.handleShow}
        >
          Dodaj kolegij
        </button>

        <Modal
          key="modal"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static" //onemogucen izlaz klikom na pozadinu
          keyboard={false} //onemogucen izlaz pomocu escape key-a
        >
          <Modal.Header key="header" closeButton>
            <Modal.Title key="naslov" id="contained-modal-title-vcenter">
              Dodaj kolegij!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body key="body">
            <Form key="form" onSubmit={this.handleSubmitForm}>
              <Form.Label>Naziv kolegija:</Form.Label>
              <Form.Control
                key="ime"
                name="ime"
                as="textarea"
                rows="1"
                onChange={this.handleCourseNameChange}
                maxLength={30}
                minLength={1}
                required={true}
              />
              <Form.Label>Smjer kolegija:</Form.Label>
              <div key="div" className="mb-3">
                <Form.Check
                  key="smjer"
                  inline
                  label="R"
                  name="smjer"
                  type="radio"
                  value="R"
                  onChange={this.handleCourseDirectionChange}
                />
                <Form.Check
                  key="smjer"
                  inline
                  label="E"
                  name="smjer"
                  type="radio"
                  value="E"
                  onChange={this.handleCourseDirectionChange}
                />
              </div>

              <ModalFooter key="footer">
                <ButtonGroup key="buttons">
                  <Button
                    key="btn1"
                    variant="danger"
                    onClick={this.handleClose}
                  >
                    Odustani
                  </Button>
                  <Button
                    key="btn2"
                    variant="success"
                    type="submit"
                    disabled={this.state.ime === "" || this.state.smjer === ""}
                  >
                    Dodaj
                  </Button>
                </ButtonGroup>
              </ModalFooter>
            </Form>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default AddCourse;
