import Resizable from "react-resizable-box";
import Draggable from "react-draggable";
import './Box.css'
  
const Box = () => {
  
  return (
    <div id="tvbox">
      <Draggable bounds={{ top: 6, left: 0, right: 636, bottom: 444 }}>
        <div id="drag-wrapper">
          <Resizable
            className="item">
            Move me around
          </Resizable>
        </div>
      </Draggable>
    </div>
  )
};

export default Box;
