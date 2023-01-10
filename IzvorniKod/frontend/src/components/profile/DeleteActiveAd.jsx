import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ButtonGroup, Form, ModalFooter } from "react-bootstrap";
import { useState } from "react";
import { deleteDataAuth } from "../../scripts/util";

export default function EditActiveAd(props) {
	const [show, setShow] = useState(false);

	const handleShow = () => {
		setShow(true);
	};

	const handleClose = (_) => {
		setShow(false);
	};

	function optionSubmitForm(event) {
		event.preventDefault();

		deleteDataAuth(`oglasi/${props.props.ad.id}`, {}).then((res) => {
			if (res.error) {
				alert("Oglas nije moguće obrisati!");
			} else {
				if (props.props.onAdDelete !== undefined) props.props.onAdDelete(props.props.ad);

				alert("Oglas uspješno obrisan!");
				setShow(false);
				window.location.reload(false);
			}
		});
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
					<Modal.Title id="contained-modal-title-vcenter">
						Jeste li sigurni?
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form onSubmit={optionSubmitForm}>
						<div className="mb-3">
							<Form.Label>
								Želite li stvarno obrisati oglas? Ovaj se
								postupak ne može poništiti.
							</Form.Label>
						</div>
						<ModalFooter>
							<ButtonGroup>
								<Button variant="danger" onClick={handleClose}>
									Odustani
								</Button>
								<Button variant="success" type="submit">
									Obriši
								</Button>
							</ButtonGroup>
						</ModalFooter>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}
