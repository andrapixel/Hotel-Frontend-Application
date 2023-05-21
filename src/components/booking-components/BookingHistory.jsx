import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import axios from "axios";
import CancelBookingModal from "./CancelBookingModal";
import { useNavigate } from "react-router-dom";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [showCancelBookingModal, setShowCancelBookingModal] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.setItem("userId", null); // Reset the user ID to null
    localStorage.setItem("role", "");
    localStorage.removeItem("username"); // Remove the username from local storage
    navigate("/login"); // Navigate to the login page
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/hotel/account-bookings/${userId}`
      );
      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ backgroundColor: "#f0f5f5", height: "100vh" }}>
      <header
        style={{
          backgroundColor: "#3d5c5c",
          padding: "10px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <nav>
          <button
            onClick={() => navigate("/")}
            style={{
              color: "white",
              marginRight: "10px",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            About
          </button>
          <button
            onClick={() => navigate("/rooms")}
            style={{
              color: "white",
              marginRight: "10px",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            Rooms
          </button>
          <button
            onClick={() => navigate("/bookings")}
            style={{
              color: "white",
              marginRight: "10px",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            Bookings
          </button>
          <button
            onClick={() => navigate("/accounts")}
            style={{
              color: "white",
              marginRight: "10px",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            Accounts
          </button>
          <button
            onClick={() => navigate("/contact")}
            style={{
              color: "white",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            Contact
          </button>
        </nav>

        <div>
          {username && (
            <span style={{ color: "white", marginRight: "10px" }}>
              Welcome, {username}!
              <span style={{ marginLeft: "20px", marginRight: "10px" }}>|</span>
            </span>
          )}
          {userId === "null" && (
            <>
              <button
                onClick={() => navigate("/login")}
                style={{
                  color: "white",
                  marginRight: "10px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                style={{
                  color: "white",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                Register
              </button>
            </>
          )}
          {userId !== "null" && (
            <>
              <button
                onClick={handleLogout}
                style={{
                  color: "white",
                  marginRight: "10px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      <Container>
        <Row>
          <Col xs={12} md={7}>
            <div
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "1000px",
                overflow: "scroll",
                marginTop: "50px",
              }}
            >
              <h5 style={{ color: "#3d5c5c", marginBottom: "30px" }}>
                My Bookings
              </h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Account ID</th>
                    <th>Room ID</th>
                    <th>Check-in Date</th>
                    <th>Check-out Date</th>
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
          </Col>
          <Col xs={12} md={5} className="d-flex justify-content-end">
            <div
              style={{
                width: "350px",
                marginTop: "50px",
                backgroundColor: "#3d5c5c",
                padding: "20px",
                color: "white",
                textAlign: "center",
              }}
            >
              <h5 style={{ marginBottom: "30px", textAlign: "center" }}>
                Bookings Management
              </h5>
              <Button
                style={{
                  marginBottom: "20px",
                  width: "70%",
                  backgroundColor: "#75a3a3",
                }}
                onClick={() => setShowCancelBookingModal(true)}
              >
                Cancel booking
              </Button>
              <CancelBookingModal
                show={showCancelBookingModal}
                onHide={() => setShowCancelBookingModal(false)}
                onBookingCancelled={fetchBookings}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BookingHistory;
