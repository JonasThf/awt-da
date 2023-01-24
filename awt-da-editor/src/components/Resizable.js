import React from "react";
import { Rnd } from "react-rnd";
import './Resizable.css';



const Resizable = (props) => {

  const [state, setState] = React.useState({
    width: '200px',
    height: '200px',
    x: 1,
    y: 1
  })

  const style = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "solid 1px #ddd",
      background: "#f0f0f0"
    };

  function setOnDragStop(e,d) {
    let oldWidth = Number(state.width.split('px')[0]);
    let oldHeight = Number(state.height.split('px')[0]);
    if(oldWidth + d.x < 824 && oldHeight + d.y < 504 && d.x > 0 && d.y > 0) {
      setState({width: state.width, height: state.height, x: d.x, y: d.y })
      props.setResizer({height: state.height, width: state.width, x: d.x, y: d.y});
    } else {
      return;
    }
  }


  function setOnResizeStop(e, direction, ref, delta, position) {
    let oldWidth = Number(ref.style.width.split('px')[0]);
    let oldHeight = Number(ref.style.height.split('px')[0]);
    // console.log('old: ', state.width, state.height, state.x, state.y);
    // console.log('new: ',ref.style.width, ref.style.height, position.x, position.y);
    if(oldWidth + state.x < 824 && oldHeight + state.y < 504 && position.x > 0 && position.y > 0) {
      setState({
        width: ref.style.width,
        height: ref.style.height,
        x: position.x,
        y: position.y,
      });
      props.setResizer({height: ref.style.height, width: ref.style.width, x: state.x, y: state.y});
    } else {
      return;
    }
  }
  

  return(
    <Rnd
      style={style}
      size={{ width: state.width,  height: state.height }}
      position={{ x: state.x, y: state.y }}
      onDragStop={(e, d) => {setOnDragStop(e,d)}}
      onResizeStop={(e, direction, ref, delta, position) => {setOnResizeStop(e, direction, ref, delta, position)}}
      id="resizable"
  >
    001
    </Rnd>
  )
}

export default Resizable;