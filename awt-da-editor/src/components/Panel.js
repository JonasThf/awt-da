
import Resizer from './Resizer/Resizer';
import { Direction } from './Resizer/Constants.js';
import './Panel.css';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';


const Panel = (props) => {
  const {panelHeightWidth, setPanelRef, onDrag ,children} = props;
  const panelRef = useRef(null);
  //useEffect(() => {setPanelRef({height: panelRef.current.height, width: panelRef.current.clientWidth})}, [panelRef.current.height, panelRef.current.clientWidth]) 
  const [mouseDown, setMouseDown] = useState(false);
  

  const handleDrag = (movementX, movementY) => {
    const panel = panelRef.current;
    if (!panel) return;

    const { x, y } = panel.getBoundingClientRect();

    panel.style.left = `${x + movementX}px`;
    panel.style.top = `${y + movementY}px`;
    
  };
  useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.addEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const ratio = window.devicePixelRatio

    const handleMouseMove = (e) => onDrag(e.movementX / ratio, e.movementY / ratio);

    if (mouseDown) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseDown, onDrag]);

  const handleMouseDown = () => setMouseDown(true);



  const handleResize = (direction, movementX, movementY) => {
    const panel = panelRef.current;
    if (!panel) return;

    const { width, height, x, y } = panel.getBoundingClientRect();
  

    const resizeTop = () => {
      panel.style.height = `${height - movementY}px`;
      panel.style.top = `${y + movementY}px`;
    };

    const resizeRight = () => {
      panel.style.width = `${width + movementX}px`;
    };

    const resizeBottom = () => {
      panel.style.height = `${height + movementY}px`;
    };

    const resizeLeft = () => {
      panel.style.width = `${width - movementX}px`;
      panel.style.left = `${x + movementX}px`;
    };

    switch (direction) {
      case Direction.TopLeft:
        resizeTop();
        resizeLeft();
        break;

      case Direction.Top:
        resizeTop();
        break;

      case Direction.TopRight:
        resizeTop();
        resizeRight();
        break;

      case Direction.Right:
        resizeRight();
        break;

      case Direction.BottomRight:
        resizeBottom();
        resizeRight();
        break;

      case Direction.Bottom:
        resizeBottom();
        break;

      case Direction.BottomLeft:
        resizeBottom();
        resizeLeft();
        break;

      case Direction.Left:
        resizeLeft();
        break;

  
      }
    //console.log("first", panelHeightWidth)
    //console.log(setPanelRef)
    setPanelRef({height: panel.clientHeight, width: panel.clientWidth})
    //console.log(panelHeightWidth)
  };

  return (
    <div className="panel" id ="panel"ref={panelRef}>
      <div className="panel__container" onDrag={handleDrag} >
        <Resizer onResize={handleResize} />
        <div className="panel__content" onMouseDown={handleMouseDown}>
        {children}
        </div>
      </div>
    </div>
  );
};

export default Panel;
