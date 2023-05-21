import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function UpdateBookingModal(props) {
  const [isLoading, setLoading] = useState(false);
  const [checkinDate, setCheckinDate] = useState(props.checkinDate);
  const [checkoutDate, setCheckoutDate] = useState(props.checkoutDate);
  const [noAdults, setNoAdults] = useState(props.noAdults);
  const [noChildren, setNoChildren] = useState(props.noChildren);
  const [price, setPrice] = useState(props.price);
  const [cancelled, setCancelled] = useState(props.cancelled);
  const [bookingId, setBookingId] = useState(props.bookingId);
  const [accountId, setAccountId] = useState(props.accountId);
  const [roomId, setRoomId] = useState(props.roomId);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:8080/api/hotel/update-booking/${bookingId}`,
        {
          checkinDate: checkinDate,
          checkoutDate: checkoutDate,
          noAdults: noAdults,
          noChildren: noChildren,
          price: price,
          cancelled: cancelled,
          accountId: accountId,
          roomId: roomId,
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

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Booking Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBookingId">
            <Form.Label>Booking ID:</Form.Label>
            <Form.Control
              type="text"
              value={bookingId}
              onChange={(event) => setBookingId(event.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formAccountId">
            <Form.Label>Account ID:</Form.Label>
            <Form.Control
              type="text"
              value={accountId}
              onChange={(event) => setAccountId(event.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formRoomId">
            <Form.Label>No. Room:</Form.Label>
            <Form.Control
              type="text"
              value={roomId}
              onChange={(event) => setRoomId(event.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formCheckinDate">
            <Form.Label>Check-In Date:</Form.Label>
            <Form.Control
              type="date"
              value={checkinDate}
              onChange={(event) => setCheckinDate(event.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formCheckoutDate">
            <Form.Label>Check-Out Date:</Form.Label>
            <Form.Control
              type="date"
              value={checkoutDate}
              onChange={(event) => setCheckoutDate(event.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formNoAdults">
            <Form.Label>No. of Adults:</Form.Label>
            <Form.Control
              type="number"
              value={noAdults}
              onChange={(event) => setNoAdults(event.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formNoChildren">
            <Form.Label>No. of Children:</Form.Label>
            <Form.Control
              type="number"
              value={noChildren}
              onChange={(event) => setNoChildren(event.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formPrice">
            <Form.Label>Price:</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formCancelled">
            <Form.Check
              type="checkbox"
              label="Cancelled"
              checked={cancelled}
              onChange={(event) => setCancelled(event.target.checked)}
            />
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

export default UpdateBookingModal;
