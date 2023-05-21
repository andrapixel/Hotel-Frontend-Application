import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function CreateRoomModal(props) {
  const [capacity, setCapacity] = useState(1);
  const [available, setAvailable] = useState(true);
  const [type, setRoomType] = useState("SINGLE");

  const handleRoomTypeChange = (event) => {
    setRoomType(event.target.value);
  };

  const handleCapacityChange = (event) => {
    setCapacity(event.target.value);
  };

  const handleAvailableChange = (event) => {
    setAvailable(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/hotel/add-room",
        {
          capacity: capacity,
          available: available,
          type: type,
        }
      );
      console.log(response.data);
      props.onHide();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCapacity">
            <Form.Label>Capacity:</Form.Label>
            <Form.Control
              type="number"
              value={capacity}
              onChange={handleCapacityChange}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formAvailable">
            <Form.Check
              type="checkbox"
              label="Available"
              checked={available}
              onChange={handleAvailableChange}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formRoomType">
            <Form.Label>Room Type:</Form.Label>
            <Form.Control
              as="select"
              value={type}
              onChange={handleRoomTypeChange}
            >
              <option value="SINGLE">Single</option>
              <option value="TWIN">Twin</option>
              <option value="DOUBLE">Double</option>
              <option value="SUITE">Suite</option>
            </Form.Control>
          </Form.Group>

          <div
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="secondary"
              onClick={props.onHide}
              style={{ width: "50%", margin: "5px" }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              style={{
                backgroundColor: "#75a3a3",
                width: "50%",
                margin: "5px",
              }}
            >
              Add
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateRoomModal;
