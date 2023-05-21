import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let userId = null; // Declare userId variable and set its initial value as null
  let role = "";

  async function handleLogin(event) {
    event.preventDefault();

    if (username === "" || password === "") {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/hotel/login",
        {
          username: username,
          password: password,
        }
      );

      userId = response.data.userId;
      role = response.data.role;

      if (userId) {
        alert("Login successful.");
        console.log("User ID: ", userId); // Log the user ID to the console
        console.log("User role: ", role);

        localStorage.setItem("username", username); // Store the username in local storage
        localStorage.setItem("userId", userId); // Store the user ID in local storage
        localStorage.setItem("role", role);
        navigate("/");
      } else {
        alert("Login unsuccessful. Please check your credentials.");
      }
    } catch (err) {
      alert("An error occurred during login. Please try again.");
      console.error(err);
    }
  }

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
    <div style={{ background: "#e0e0d1", height: "100vh" }}>
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
            }}
          >
            Contact
          </button>
        </nav>

        <div>
          <button
            onClick={() => navigate("/login")}
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
        </div>
      </header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          background: "#e0e0d1",
        }}
      >
        <div
          style={{
            marginTop: "70px",
            width: "450px",
            padding: "30px",
            paddingLeft: "50px",
            paddingRight: "50px",
            background: "#f0f5f5",
            paddingBottom: "40px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "80px",
              color: "#3d5c5c",
              fontFamily: "Georgia, serif",
            }}
          >
            Hotel User Login
          </h1>
          <form>
            <div style={{ marginBottom: "20px" }}>
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
                marginTop: "30px",
              }}
            >
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleLogin}
                style={{
                  background: "#3d5c5c",
                  color: "white",
                  outlineColor: "#3d5c5c",
                }}
              >
                Log In
              </button>
            </div>

            <div style={{ textAlign: "center" }}>
              <div>
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  Register
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
