import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Dropdown } from "react-bootstrap";
import axios from "axios";
import UpdateUserModal from "./UpdateUserModal";
import DeleteUserModal from "./DeleteUserModal";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [showListUsersModal, setShowListUsersModal] = useState(false);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/hotel/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMyBookingsRedirect = () => {
    if (role === "GUEST") {
      navigate("/my-bookings");
    } else {
      alert("You do not have permission to access this page.");
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.setItem("userId", null); // Reset the user ID to null
    localStorage.setItem("role", "");
    localStorage.removeItem("username"); // Remove the username from local storage
    navigate("/login"); // Navigate to the login page
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
    <div style={{ backgroundColor: "#f0f5f5", height: "120vh" }}>
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
              fontWeight: "bold",
              textDecoration: "underline",
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
                maxWidth: "600px",
                overflow: "scroll",
                marginTop: "50px",
              }}
            >
              <h5 style={{ color: "#3d5c5c", marginBottom: "30px" }}>
                Accounts
              </h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.userId}>
                      <td>{user.userId}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.username}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
          <Col xs={12} md={5}>
            <div
              style={{
                width: "400px",
                marginTop: "50px",
                backgroundColor: "#3d5c5c",
                padding: "20px",
                color: "white",
                textAlign: "center",
              }}
            >
              <h5 style={{ marginBottom: "20px", textAlign: "center" }}>
                Account Management
              </h5>
              <Button
                style={{
                  marginBottom: "20px",
                  width: "70%",
                  backgroundColor: "#75a3a3",
                }}
                onClick={() => setShowUpdateUserModal(true)}
              >
                Update Account Details
              </Button>
              <UpdateUserModal
                show={showUpdateUserModal}
                onHide={() => setShowUpdateUserModal(false)}
                onRoomUpdated={() => setShowListUsersModal(true)}
              />

              <Button
                style={{ width: "70%", backgroundColor: "#75a3a3" }}
                onClick={() => setShowDeleteUserModal(true)}
              >
                Delete Account
              </Button>
              <DeleteUserModal
                show={showDeleteUserModal}
                onHide={() => setShowDeleteUserModal(false)}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Users;
