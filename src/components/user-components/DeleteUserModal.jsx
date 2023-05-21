import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function DeleteUserModal(props) {
  const [isLoading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:8080/api/hotel/delete-user/${userId}`
      );
      console.log(response.data);
      props.onHide();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Enter the ID of the user you want to delete:</p>
        <Form.Control
          type="text"
          value={userId}
          onChange={handleUserIdChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" disabled={isLoading} onClick={props.onHide}>
          Cancel
        </Button>
        <Button
          variant="danger"
          disabled={isLoading}
          onClick={handleDelete}
          style={{ backgroundColor: "#75a3a3" }}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteUserModal;
