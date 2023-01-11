import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ButtonGroup, Form, ModalFooter } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getCategoriesPretty,
  getCategoryToEnumValue,
  getData,
  getPersonInfo,
  postDataAuth,
} from "../../scripts/util";

export default function CreateAd() {
  let personInfo = getPersonInfo();

  const [count, setCount] = React.useState(0);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [ad, setAd] = useState({
    radnja: "",
    kolegij: "",
    kategorija: "",
    naslov: "",
    opis: "",
  });
  const [kolegiji, setKolegiji] = useState([""]);

  let kategorije = getCategoriesPretty();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (personInfo === null) {
      navigate("/login");
    } else {
      setShow(true);
    }
  };

  React.useEffect(() => {
    getData("/kolegiji").then((data) => {
      setKolegiji(data);
    });
  }, []);

  function handleAdChange(event) {
    setAd((prevAd) => {
      return { ...prevAd, [event.target.name]: event.target.value };
    });
  }

  function handleCount(event) {
    setCount(event.target.value.length);
  }

  function handleMultipleFun(event) {
    handleCount(event);
    handleAdChange(event);
  }

  function optionSubmitForm(event) {
    event.preventDefault();

    const data = {
      naslov: ad.naslov,
      opis: ad.opis,
      kolegij_ime: ad.kolegij,
      kategorija: ad.kategorija,
      trazimPomoc: ad.radnja,
    };

    postDataAuth("oglasi", data).then((res) => {
      if (res.error) {
        setError(res.message);
      } else {
        setCount(0);
        setShow(false);
        window.location.reload(false);
      }
    });
  }

  return (
    <>
      <button
        className="btn btn-lg btn-block btn-success rounded-3 py-4 mb-3 bg-op-6 roboto-bold"
        onClick={handleShow}
      >
        Kreiraj oglas
      </button>

      <Modal
        key="createAdModal"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Kreiraj oglas!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form" onSubmit={optionSubmitForm}>
            <div className="mb-3" required={true}>
              <Form.Check
                inline
                label="Tražim pomoć!"
                name="radnja"
                type="radio"
                value="true"
                onChange={handleAdChange}
              />
              <Form.Check
                inline
                label="Nudim pomoć!"
                name="radnja"
                type="radio"
                value="false"
                onChange={handleAdChange}
              />
            </div>

            <div className="mb-3">
              <Form.Select
                required={true}
                aria-label="Default select example"
                name="kolegij"
                onChange={handleAdChange}
              >
                <option key="createAddAllCourses" value="">
                  Kolegij
                </option>
                {kolegiji.map((kolegij) => {
                  return (
                    <option
                      key={`createAddCourse${kolegij.ime}`}
                      value={kolegij.ime}
                    >
                      {kolegij.ime}
                    </option>
                  );
                })}
              </Form.Select>
            </div>

            <div className="mb-3">
              <Form.Select
                required={true}
                aria-label="Default select example"
                name="kategorija"
                onChange={handleAdChange}
              >
                <option key="createAddAllCategories" value="">
                  Kategorija
                </option>
                {kategorije.map((kategorija) => {
                  return (
                    <option
                      key={`createAdd${kategorija}category`}
                      value={getCategoryToEnumValue(kategorija)}
                    >
                      {kategorija}
                    </option>
                  );
                })}
              </Form.Select>
            </div>

            <div className="mb-3">
              <Form.Label>Naslov oglasa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Naslov"
                name="naslov"
                required={true}
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
                minLength={10}
                required={true}
              ></Form.Control>
              <div>
                <p>
                  {count}/{255}
                </p>
              </div>
            </div>
            <ModalFooter>
              <ButtonGroup className="mb-3 d-flex ">
                <Button variant="danger" onClick={handleClose}>
                  Odustani
                </Button>
                <Button variant="secondary" type="reset">
                  Očisti
                </Button>
                <Button
                  variant="success"
                  type="submit"
                  disabled={
                    !ad.radnja ||
                    !ad.kolegij ||
                    !ad.kategorija ||
                    !ad.naslov ||
                    !ad.opis
                      ? true
                      : false
                  }
                >
                  Kreiraj
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
