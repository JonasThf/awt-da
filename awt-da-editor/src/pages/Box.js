import Resizable from "react-resizable-box";
import Draggable from "react-draggable";
import './Box.css'
  
<<<<<<< HEAD
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
=======
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


>>>>>>> e972391bd179f6e09db43b7b967d274a55ef7c20
