import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Dropdown } from "react-bootstrap";
import axios from "axios";
import CreateRoomModal from "./CreateRoomModal";
import DeleteRoomModal from "./DeleteRoomModal";
import UpdateRoomModal from "./UpdateRoomModal";
import CreateBookingModal from "../booking-components/CreateBookingModal";
import { useNavigate } from "react-router-dom";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [showUpdateRoomModal, setShowUpdateRoomModal] = useState(false);
  const [showDeleteRoomModal, setShowDeleteRoomModal] = useState(false);
  const [showCreateBookingModal, setShowCreateBookingModal] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.setItem("userId", null); // Reset the user ID to null
    localStorage.setItem("role", "");
    localStorage.removeItem("username"); // Remove the username from local storage
    navigate("/login"); // Navigate to the login page
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/hotel/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateRoomModalClose = () => {
    setShowCreateRoomModal(false);
    setShowListRoomsModal(true); // show the ListRoomsModal after the CreateRoomModal is closed
  };

  const handleCreateBookingModalClose = () => {
    setShowCreateBookingModal(false);
  };

  const handleMyBookingsRedirect = () => {
    if (role === "GUEST") {
      navigate("/my-bookings");
    } else {
      alert("You do not have permission to access this page.");
      navigate("/");
    }
  };

  const handleBookingsRedirect = () => {
    if (userId === "null") {
      alert("Please log in to access this page.");
      navigate("/");
    } else {
      if (role === "ADMIN") {
        navigate("/bookings");
      } else {
        alert("You do not have permission to access this page.");
        navigate("/");
      }
    }
  };

  const handleAccountsRedirect = () => {
    if (userId === "null") {
      alert("Please log in to access this page.");
      navigate("/");
    } else {
      if (role === "ADMIN") {
        navigate("/accounts");
      } else {
        alert("You do not have permission to access this page.");
        navigate("/");
      }
    }
  };

  const handleMakeBookingButton = () => {
    if (role === "GUEST") {
      setShowCreateBookingModal(true);
    } else {
      alert("You do not have permission to perform this operation.");
    }
  };

  const handleAddRoomButton = () => {
    if (role === "ADMIN") {
      setShowCreateRoomModal(true);
    } else {
      alert("You do not have permission to perform this operation.");
    }
  };

  const handleUpdateRoomButton = () => {
    if (role === "ADMIN") {
      setShowUpdateRoomModal(true);
    } else {
      alert("You do not have permission to perform this operation.");
    }
  };

  const handleDeleteRoomButton = () => {
    if (role === "ADMIN") {
      setShowDeleteRoomModal(true);
    } else {
      alert("You do not have permission to perform this operation.");
    }
  };

  useEffect(() => {
    if (
      userId === "null" &&
      (window.location.pathname === "/accounts" ||
        window.location.pathname === "/bookings" ||
        window.location.pathname === "/my-bookings")
    ) {
      alert("Please log in to access this page.");
      navigate("/");
    } else if (userId !== "null") {
      if (
        role !== "ADMIN" &&
        (window.location.pathname === "/accounts" ||
          window.location.pathname === "/bookings")
      ) {
        alert("You do not have permission to access this page.");
        navigate("/");
      }
    }
  }, [userId, navigate]);

  return (
    <div style={{ backgroundColor: "#f0f5f5", height: "140vh" }}>
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
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Rooms
          </button>
          <button
            onClick={handleBookingsRedirect}
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
            onClick={handleAccountsRedirect}
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <Dropdown>
                <Dropdown.Toggle
                  variant="link"
                  id="welcome-dropdown"
                  style={{
                    color: "white",
                    marginRight: "10px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  Welcome, {username}!
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleMyBookingsRedirect}>
                    My Bookings
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <button
                onClick={handleLogout}
                style={{
                  color: "white",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          )}
          {!username && userId === "null" && (
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
        </div>
      </header>

      <Container>
        <Row>
          <Col xs={12} md={7}>
            <div
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "500px",
                overflow: "scroll",
                marginTop: "50px",
              }}
            >
              <h5 style={{ color: "#3d5c5c", marginBottom: "30px" }}>Rooms</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Capacity</th>
                    <th>Type</th>
                    <th>Is Available</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr key={room.id}>
                      <td>{room.noRoom}</td>
                      <td>{room.capacity}</td>
                      <td>{room.type}</td>
                      <td>{room.available ? "YES" : "NO"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
          <Col xs={12} md={5}>
            <Col xs={12} md={6}>
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
                <Button
                  style={{
                    marginBottom: "20px",
                    width: "70%",
                    backgroundColor: "#75a3a3",
                  }}
                  onClick={handleMakeBookingButton}
                >
                  Make a Booking
                </Button>
                <CreateBookingModal
                  show={showCreateBookingModal}
                  onHide={() => setShowCreateBookingModal(false)}
                  onClose={handleCreateBookingModalClose}
                />
              </div>
            </Col>

            <Col xs={12} md={6}>
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
                <h5 style={{ marginBottom: "20px", textAlign: "center" }}>
                  Room Management
                </h5>
                <Button
                  style={{
                    marginBottom: "20px",
                    width: "70%",
                    backgroundColor: "#75a3a3",
                  }}
                  onClick={handleAddRoomButton}
                >
                  Add New Room
                </Button>
                <CreateRoomModal
                  show={showCreateRoomModal}
                  onHide={() => setShowCreateRoomModal(false)}
                  onClose={handleCreateRoomModalClose}
                />

                <Button
                  style={{
                    marginBottom: "20px",
                    width: "70%",
                    backgroundColor: "#75a3a3",
                  }}
                  onClick={handleUpdateRoomButton}
                >
                  Update Room Details
                </Button>
                <UpdateRoomModal
                  show={showUpdateRoomModal}
                  onHide={() => setShowUpdateRoomModal(false)}
                  onRoomUpdated={() => setShowListRoomsModal(true)}
                />

                <Button
                  style={{ width: "70%", backgroundColor: "#75a3a3" }}
                  onClick={handleDeleteRoomButton}
                >
                  Delete Room
                </Button>
                <DeleteRoomModal
                  show={showDeleteRoomModal}
                  onHide={() => setShowDeleteRoomModal(false)}
                />
              </div>
            </Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Rooms;
