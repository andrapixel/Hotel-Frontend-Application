import { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import axios from "axios";

function ListRoomsModal(props) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/hotel/rooms"
        );
        setRooms(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchRooms();
  }, []);

  const handleCreateRoomClick = () => {
    props.onShowCreateRoomModal();
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Hotel Rooms List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ width: "500 px", overflow: "scroll" }}>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ListRoomsModal;
