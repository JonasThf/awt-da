import React, { useRef } from "react";
import './App.css';
import CreateInstance from './pages/CreateInstance'
import CreateTemplate from './pages/CreateTemplate';
import { Row, Col} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Television from "./components/Television";


function App() {
  const [frontImg, setFrontImg] = React.useState(null);
  const [images, setImages2] = React.useState(null);
  const [createTemplateRespone, setCreateTemplateRespone] = React.useState(null);
  const [panel, setPanelRef] = React.useState({height: "200px", width: "100px"})
  
  const [show, setShow] = React.useState(false);
  const [popupColor, setPopupColor] = React.useState('');

  const handleClose = () => setShow(false);

  const setShowTrue = () => {
    setShow(true);
  }

  const setRespone = (respone) => {
    setCreateTemplateRespone(respone);
  }

  const setColor = (color) => {
    setPopupColor(color);
  }

  const setImages = (images) => {
    setImages2(images);
    setFrontImg(images[0]);
  }

  

  return(
    <div className="root">
      <Modal show={show} onHide={handleClose}>
        <Modal.Body id="create-template-body" style={{backgroundColor: popupColor}}>{createTemplateRespone}</Modal.Body>
      </Modal>
      <Container id="container">
        <Row id="row1">
          <Col md={10} id="header">Welcome to the Display Ad Editor</Col>
        </Row>
        <Row id="row2">
          <Col className="px-0" id="create-template-col" md={2}>
            <CreateTemplate setShow={setShowTrue} setRespone={setRespone} setColor={setColor}></CreateTemplate>
          </Col>
          <Col id="box-col" className="px-0" md={5}>
            <Row id="row3">
              <p id="tv">TV</p>
            </Row>
            <Row id="row4">
              <Television frontImg={frontImg}></Television>
            </Row>
          </Col>
          <Col id="create-instance-col" className="px-0" md={2}>
            <CreateInstance setImages={setImages}></CreateInstance>
          </Col>
        </Row>
      </Container>
    </div>
  );
 

  
}

export default App;
