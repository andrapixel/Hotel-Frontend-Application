import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { useEffect } from "react";

function Contact() {
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
              fontWeight: "bold",
              textDecoration: "underline",
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
          <Col>
            <div style={{ marginTop: "50px" }}>
              <h2 style={{ color: "#3d5c5c", marginBottom: "50px" }}>
                Contact Us
              </h2>
              <p>
                We would love to hear from you! If you have any questions,
                inquiries, or feedback, please feel free to reach out to our
                team.
              </p>
              <p>You can contact us through the following methods:</p>
              <ul>
                <li>Phone: +123456789</li>
                <li>Email: info@springboothotel.com</li>
                <li>Address: 123 Main Street, New York, US</li>
              </ul>
              <p>
                Our team is available to assist you during our business hours,
                Monday to Friday, from 9 AM to 5 PM. We strive to respond to all
                inquiries within 24 hours.
              </p>
              <p>
                Thank you for your interest in our hotel. We look forward to
                hearing from you and assisting you with your needs.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Contact;
