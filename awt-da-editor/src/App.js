import React from "react";
import './App.css';
import CreateInstance from './pages/CreateInstance'
import CreateTemplate from './pages/CreateTemplate';
import Panel from "./components/Panel";
import { Row, Col} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import { Filecontext } from './Filecontext';


function App() {
  const [imgData, setImgData] = React.useState(null);
  
  return(
    <div className="root">
      <Filecontext.Provider value={{ imgData, setImgData }}>
        <Container id="container">
          <Row>
            <Col md={12} id="header" >Welcome to the Display Ad Editor</Col>
          </Row>
          <Row id="row">
            <Col className="px-0" id="createTemplateCol" md={3}>
              <CreateTemplate></CreateTemplate>
            </Col>
            <Col id="boxCol" className="px-0" md={6}>
              <p id="tv">TV</p>
              <Panel>content</Panel>
              <Panel>Panel 2</Panel>
              <Image fluid src={imgData} id="uploadImage"/>
            </Col>
            <Col id="createInstanceCol" className="px-0" md={3}>
              <CreateInstance></CreateInstance>
            </Col>
          </Row>
        </Container>
      </Filecontext.Provider>
    </div>
  );
 

  
}

export default App;
