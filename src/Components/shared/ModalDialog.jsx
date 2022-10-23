import { Modal, Button } from "react-bootstrap";

const ModalDialog = ({ onShow, onOpen, OnClose, onSave, title, bodyModel }) => {
  return (
    <>
      <Modal show={onShow}>
        <Modal.Header closeButton onClick={onOpen}>
          <Modal.Title>{title}</Modal.Title>
          {/* <Button  className="btn-closeModel" onClick={OnClose}></Button> */}
        </Modal.Header>
        <Modal.Body>{bodyModel}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={OnClose}>
            Close
          </Button>
          <Button className="btn" onClick={onSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalDialog;
