import Resizable from "react-resizable-box";
import Draggable from "react-draggable";
import './Box.css'
  
  const Box = () => {
  return (
    <Draggable
    
    bounds={{ top: -100, left: -100, right: 600, bottom: 600 }}
    // bounds="parent"
    >
    <div className="drag-wrapper">
      <Resizable
        className="item"
        width={320}
        height={200}
        style={{ backgroundColor: "red" }}>
        Move me around
      </Resizable>
    </div>
  </Draggable>
)
};
export default Box;


