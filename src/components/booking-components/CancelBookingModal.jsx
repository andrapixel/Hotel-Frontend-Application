import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function CancelBookingModal(props) {
  const [isLoading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const handleCancel = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `http://localhost:8080/api/hotel/cancel-booking/${bookingId}`
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
        <Modal.Title>Cancel Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Enter the ID of the booking you want to cancel:</p>
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
          onClick={handleCancel}
          style={{ backgroundColor: "#75a3a3" }}
        >
          {isLoading ? "Canceling..." : "Cancel"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CancelBookingModal;
