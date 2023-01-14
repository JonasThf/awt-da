import React, { useState } from 'react';
import './App.css';
import CreateInstance from './pages/CreateInstance'
import CreateTemplate from './pages/CreateTemplate';
import Box from './pages/Box';
<<<<<<< HEAD
import { Row, Col} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
=======
>>>>>>> e972391bd179f6e09db43b7b967d274a55ef7c20


function App() {
  
  return(
<<<<<<< HEAD
    <Container fluid id="container">
      <Row>
        <Col id="header" sm={12}>Welcome to the Display Ad Editor</Col>
      </Row>
      <Row id="row"> 
        <Col className="px-0" id="createTemplateCol">
          <CreateTemplate></CreateTemplate>
        </Col>
        <Col id="boxCol" className="px-0" xs={6}>
          <p id="tv">TV</p>
          <Box></Box>
        </Col>
        <Col id="createInstanceCol" className="px-0">
          <CreateInstance></CreateInstance>
        </Col>
      </Row>
    </Container>
=======


    <div className="App">
      <CreateTemplate className ="createTemplate"></CreateTemplate>
      <CreateInstance className = "createInstacne"></CreateInstance>
      <Box></Box>
    </div>
    
    
>>>>>>> e972391bd179f6e09db43b7b967d274a55ef7c20
  );
  

  
}

export default App;
