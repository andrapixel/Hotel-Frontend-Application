import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const userId = localStorage.getItem("userId");

  async function save(event) {
    event.preventDefault();

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      username === "" ||
      password === "" ||
      role === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/hotel/register", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
        role: role,
      });
      alert("User registered successfully.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed.");
      console.error(err);
    }
  }

  function handleRoleChange(event) {
    setRole(event.target.value);
    document.getElementById("role").value = event.target.value;
  }

  const handleBookingsRedirect = () => {
    if (userId === "null") {
      alert("Please log in to access this page.");
      navigate("/");
    } else {
      const role = localStorage.getItem("role");
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
      const role = localStorage.getItem("role");
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
      const role = localStorage.getItem("role");
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
    <div>
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
              fontWeight: "bold",
              textDecoration: "underline",
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
          height: "95vh",
          background: "#e0e0d1",
        }}
      >
        <div
          style={{
            width: "450px",
            padding: "20px",
            paddingLeft: "50px",
            paddingRight: "50px",
            background: "#f0f5f5",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "40px",
              color: "#3d5c5c",
              fontFamily: "Georgia, serif",
            }}
          >
            Hotel User Registration
          </h1>

          <form>
            <div style={{ marginBottom: "20px" }}>
              <label>First name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                value={firstName}
                onChange={(event) => {
                  setFirstname(event.target.value);
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label>Last name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter last name"
                value={lastName}
                onChange={(event) => {
                  setLastname(event.target.value);
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label>Email address:</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email address"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>

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

            <div style={{ marginBottom: "20px" }}>
              <label>Register as:</label>
              <select
                className="form-control"
                id="roleSelect"
                onChange={handleRoleChange}
              >
                <option value="">Select a role</option>
                <option value="ADMIN">Administrator</option>
                <option value="GUEST">Guest</option>
              </select>
              <input type="hidden" id="role" />
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
                onClick={save}
                style={{
                  background: "#3d5c5c",
                  color: "white",
                  outlineColor: "#3d5c5c",
                }}
              >
                Sign Up
              </button>
            </div>

            <div style={{ textAlign: "center" }}>
              <div>
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  Login
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
