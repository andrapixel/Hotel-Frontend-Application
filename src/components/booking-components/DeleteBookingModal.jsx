import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function DeleteBookingModal(props) {
  const [isLoading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:8080/api/hotel/delete-booking/${bookingId}`
      );
      console.log(response.data);
      props.onHide();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingIdChange = (event) => {
    setBookingId(event.target.value);
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Enter the ID of the booking you want to delete:</p>
        <Form.Control
          type="text"
          value={bookingId}
          onChange={handleBookingIdChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" disabled={isLoading} onClick={props.onHide}>
          Cancel
        </Button>
        <Button
          variant="danger"
          disabled={isLoading}
          onClick={handleDelete}
          style={{ backgroundColor: "#75a3a3" }}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteBookingModal;
