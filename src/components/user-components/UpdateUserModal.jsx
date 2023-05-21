import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function UpdateUserModal(props) {
  const [isLoading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [email, setEmail] = useState(props.email);
  const [username, setUsername] = useState(props.username);
  const [password, setPassword] = useState(props.password);
  const [role, setRole] = useState(props.role);
  const [userId, setUserId] = useState(props.userId);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:8080/api/hotel/update-user/${userId}`,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          username: username,
          password: password,
          role: role,
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
        <Modal.Title>Update User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUserId">
            <Form.Label>User ID:</Form.Label>
            <Form.Control
              type="text"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formRole">
            <Form.Label>Role:</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="">Select a role</option>
              <option value="GUEST">Guest</option>
              <option value="ADMIN">Admin</option>
            </Form.Control>
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

export default UpdateUserModal;
