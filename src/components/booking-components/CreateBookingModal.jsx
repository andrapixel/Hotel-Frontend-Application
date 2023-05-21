import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function CreateBookingModal(props) {
  const [roomId, setRoomId] = useState("");
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [noAdults, setNoAdults] = useState(1);
  const [noChildren, setNoChildren] = useState(0);

  const handleRoomIdChange = (event) => {
    setRoomId(event.target.value);
  };

  const handleCheckinDateChange = (event) => {
    setCheckinDate(event.target.value);
  };

  const handleCheckoutDateChange = (event) => {
    setCheckoutDate(event.target.value);
  };

  const handleNoAdultsChange = (event) => {
    setNoAdults(event.target.value);
  };

  const handleNoChildrenChange = (event) => {
    setNoChildren(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const bookingData = {
        accountId: localStorage.getItem("userId"),
        roomId: roomId,
        checkinDate: checkinDate,
        checkoutDate: checkoutDate,
        noAdults: noAdults,
        noChildren: noChildren,
      };

      const response = await axios.post(
        "http://localhost:8080/api/hotel/create-booking",
        bookingData
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
        <Modal.Title>Make a Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formRoomId">
            <Form.Label>No. Room:</Form.Label>
            <Form.Control
              type="text"
              value={roomId}
              onChange={handleRoomIdChange}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formCheckinDate">
            <Form.Label>Check-in Date:</Form.Label>
            <Form.Control
              type="date"
              value={checkinDate}
              onChange={handleCheckinDateChange}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formCheckoutDate">
            <Form.Label>Checkout Date:</Form.Label>
            <Form.Control
              type="date"
              value={checkoutDate}
              onChange={handleCheckoutDateChange}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formNoAdults">
            <Form.Label>Number of Adults:</Form.Label>
            <Form.Control
              type="number"
              value={noAdults}
              onChange={handleNoAdultsChange}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formNoChildren">
            <Form.Label>Number of Children:</Form.Label>
            <Form.Control
              type="number"
              value={noChildren}
              onChange={handleNoChildrenChange}
            />
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
              Book
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateBookingModal;
