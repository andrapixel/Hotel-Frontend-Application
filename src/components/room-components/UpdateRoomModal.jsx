import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function UpdateRoomModal(props) {
  const [isLoading, setLoading] = useState(false);
  const [capacity, setCapacity] = useState(props.capacity);
  const [available, setAvailable] = useState(props.available);
  const [type, setType] = useState(props.type);
  const [noRoom, setNoRoom] = useState(props.noRoom);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:8080/api/hotel/update-room/${noRoom}`,
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
    } finally {
      setLoading(false);
    }
  };

  const handleAvailableChange = (event) => {
    setAvailable(event.target.checked);
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Room Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNoRoom">
            <Form.Label>No. Room:</Form.Label>
            <Form.Control
              type="text"
              value={noRoom}
              onChange={(event) => setNoRoom(event.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formCapacity">
            <Form.Label>Capacity:</Form.Label>
            <Form.Control
              type="text"
              value={capacity}
              onChange={(event) => setCapacity(event.target.value)}
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
            <Form.Label>Type:</Form.Label>
            <Form.Control
              as="select"
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value="SINGLE">Single</option>
              <option value="TWIN">Twin</option>
              <option value="DOUBLE">Double</option>
              <option value="SUITE">Suite</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="secondary"
            disabled={isLoading}
            onClick={props.onHide}
            style={{ width: "100%", margin: "5px" }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={isLoading}
            onClick={handleUpdate}
            style={{ backgroundColor: "#75a3a3", width: "100%", margin: "5px" }}
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateRoomModal;
