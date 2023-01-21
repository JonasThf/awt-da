import React from "react";
import { Rnd } from "react-rnd";
import './Resizable.css';



const Resizable = () => {

  const [state, setState] = React.useState({
    width: 200,
    height: 200,
    x: 10,
    y: 10
  })

  const style = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "solid 1px #ddd",
      background: "#f0f0f0"
    };
  

  return(
    <Rnd style={style} default={{
      x: 0,
      y: 0,
      width: 320,
      height: 138
    }} id="resizable" maxHeight={137} maxWidth={822}
  >
    Rnd
  </Rnd>
  )
}

export default Resizable;