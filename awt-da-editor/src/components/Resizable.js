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

  
  function isIntersecting(el1, el2) {
    console.log(el1,el2);
    const rect1 = el1.getBoundingClientRect()
    const rect2 = el2.getBoundingClientRect();
    
    return !(
      (rect1.bottom < rect2.top) || (rect1.top > rect2.bottom) ||
      (rect1.right < rect2.left) || (rect1.left > rect2.right)
    );
  }


  function setOnDragStop(e,d) {
    let oldWidth = Number(state.width.split('px')[0]);
    let oldHeight = Number(state.height.split('px')[0]);
    let safeArea = props.safeArea;
    let resizable = document.getElementById('resizable');
    if(oldWidth + d.x < 1288 && oldHeight + d.y < 728 && d.x > 0 && d.y > 0 && !(isIntersecting(safeArea, resizable))) {
      setState({width: state.width, height: state.height, x: d.x, y: d.y })
      props.setResizer({height: state.height, width: state.width, x: d.x, y: d.y});
    } else {
      return;
    }
  }


  function setOnResizeStop(e, direction, ref, delta, position) {
    let oldWidth = Number(ref.style.width.split('px')[0]);
    let oldHeight = Number(ref.style.height.split('px')[0]);
    let safeArea = props.safeArea;
    let resizable = document.getElementById('resizable');
    if(oldWidth + state.x < 1288 && oldHeight + state.y < 728 && position.x > 0 && position.y > 0 && !(isIntersecting(safeArea, resizable))) {
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
      id="resizable">AD
    </Rnd>
  )
}

export default Resizable;