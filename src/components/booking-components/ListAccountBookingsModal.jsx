import { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import axios from "axios";

function ListAccountBookingsModal(props) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/account-bookings/${props.accountId}`
        );
        setBookings(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBookings();
  }, [props.accountId]);

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Booking List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ width: "100%", overflow: "scroll" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Account ID</th>
                <th>Room ID</th>
                <th>Check-In Date</th>
                <th>Check-Out Date</th>
                <th>No. of Adults</th>
                <th>No. of Children</th>
                <th>Price</th>
                <th>Cancelled</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.bookingId}>
                  <td>{booking.bookingId}</td>
                  <td>{booking.accountId}</td>
                  <td>{booking.roomId}</td>
                  <td>{booking.checkinDate}</td>
                  <td>{booking.checkoutDate}</td>
                  <td>{booking.noAdults}</td>
                  <td>{booking.noChildren}</td>
                  <td>{booking.price}</td>
                  <td>{booking.cancelled ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ListAccountBookingsModal;
