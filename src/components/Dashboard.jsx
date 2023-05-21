import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import hotel1 from "../images/hotel1.jpeg";
import hotel2 from "../images/hotel2.jpeg";
import hotel3 from "../images/hotel3.jpeg";
import hotel7 from "../images/hotel7.jpeg";
import hotel8 from "../images/hotel8.jpeg";
import hotel9 from "../images/hotel9.jpeg";
import hotel10 from "../images/hotel10.jpeg";
import hotel12 from "../images/hotel12.jpeg";
import { Container, Row, Col, Table, Button, Dropdown } from "react-bootstrap";

function Dashboard() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const slideshowInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 8);
    }, 2000);

    return () => {
      clearInterval(slideshowInterval);
    };
  }, []);

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
              fontWeight: "bold",
              textDecoration: "underline",
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

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1 style={{ fontFamily: "Georgia, serif", color: "#3d5c5c" }}>
          Welcome to the SpringBoot Hotel!
        </h1>
      </div>

      <Container>
        <Row>
          <Col>
            <div style={{ marginTop: "50px" }}>
              <h3 style={{ color: "#3d5c5c", marginBottom: "40px" }}>
                About Our Hotel
              </h3>
              <p>
                Welcome to our luxury hotel! We pride ourselves on providing
                exceptional service and a memorable experience for all our
                guests.
              </p>
              <p>
                Our hotel is located in a prime location, offering stunning
                views and easy access to popular tourist attractions and
                business centers.
              </p>
              <p>
                Whether you're traveling for business or leisure, our dedicated
                staff is committed to ensuring your stay is comfortable and
                enjoyable. With our state-of-the-art facilities, spacious rooms,
                and world-class amenities, we strive to exceed your
                expectations.
              </p>
              <p>
                Indulge in our exquisite dining options, relax by the poolside,
                or rejuvenate at our luxurious spa. We also offer a range of
                event spaces for conferences, weddings, and other special
                occasions.
              </p>
              <p>
                At our hotel, we prioritize guest satisfaction and personalized
                service. Our team of professionals is always ready to assist you
                with any requests or inquiries you may have during your stay.
              </p>
              <p>
                Thank you for choosing our hotel. We look forward to providing
                you with an unforgettable experience and creating lasting
                memories.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <div style={{ maxWidth: "600px", margin: "30px auto" }}>
        <h3
          style={{ color: "#3d5c5c", marginBottom: "40px", marginTop: "50px" }}
        >
          Gallery:
        </h3>
        <img
          src={hotel1}
          alt="Slide 1"
          style={{
            width: "100%",
            height: "auto",
            display: currentSlide === 0 ? "block" : "none",
          }}
        />
        <img
          src={hotel2}
          alt="Slide 2"
          style={{
            width: "100%",
            height: "auto",
            display: currentSlide === 1 ? "block" : "none",
          }}
        />
        <img
          src={hotel3}
          alt="Slide 3"
          style={{
            width: "100%",
            height: "auto",
            display: currentSlide === 2 ? "block" : "none",
          }}
        />
        <img
          src={hotel7}
          alt="Slide 4"
          style={{
            width: "100%",
            height: "auto",
            display: currentSlide === 3 ? "block" : "none",
          }}
        />
        <img
          src={hotel8}
          alt="Slide 5"
          style={{
            width: "100%",
            height: "auto",
            display: currentSlide === 4 ? "block" : "none",
          }}
        />
        <img
          src={hotel10}
          alt="Slide 6"
          style={{
            width: "100%",
            height: "auto",
            display: currentSlide === 5 ? "block" : "none",
          }}
        />
        <img
          src={hotel9}
          alt="Slide 7"
          style={{
            width: "100%",
            height: "auto",
            display: currentSlide === 6 ? "block" : "none",
          }}
        />
        <img
          src={hotel12}
          alt="Slide 8"
          style={{
            width: "100%",
            height: "auto",
            display: currentSlide === 7 ? "block" : "none",
          }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
