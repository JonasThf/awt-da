import React, { useRef } from "react";
import './App.css';
import CreateInstance from './pages/CreateInstance'
import CreateTemplate from './pages/CreateTemplate';
import { Row, Col} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Television from "./components/Television";
import Resizable from "./components/Resizable";

function App() {
  const [createTemplateRespone, setCreateTemplateRespone] = React.useState(null);
  const [resizer, setResizer] = React.useState({
    width: 200,
    height: 200,
    x: 10,
    y: 10});
  
  const [show, setShow] = React.useState(false);
  const [popupColor, setPopupColor] = React.useState('');
  const [bannerState, setBannerState] = React.useState(null);
  const [preview, setPreview] = React.useState(<div></div>);

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
            <CreateTemplate setResizer={setResizer} resizer={resizer} setShow={setShowTrue} setRespone={setRespone} setColor={setColor} setBannerState={setBannerState}></CreateTemplate>
          </Col>
          <Col id="box-col" className="px-0" md={5}>
            <Row id="row3">
              <p id="tv">TV</p>
            </Row>
            <Row id="row4">
              { bannerState === "1" ? <Resizable setResizer={setResizer}></Resizable> : null}
              <Television bannerState={bannerState}></Television>
              {preview}
            </Row> 
          </Col>
          <Col id="create-instance-col" className="px-0" md={2}>
            <CreateInstance setPreview={setPreview} setShow={setShowTrue} setColor={setColor} setRespone={setRespone}></CreateInstance>
          </Col>
        </Row>
      </Container>
    </div>
  );
 

  
}

export default App;
