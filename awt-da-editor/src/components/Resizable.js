import React from "react";
import { Rnd } from "react-rnd";

const Resizable = (props) => {

  function setOnDragStop(e, d) {
    let width = props.bannerStyle.width;
    let height = props.bannerStyle.height;

    // Make sure that resizable object does not pass tv borders
    if (width + d.x <= 1280 && height + d.y <= 720 && d.x >= 0 && d.y >= 0) {
      props.setBannerStyle({ height: height, width: width, x: d.x, y: d.y });
    } else {
      return;
    }
  }

  function setOnResize(e, direction, ref, delta, position) {
    let width = Number(ref.style.width.split('px')[0]);
    let height = Number(ref.style.height.split('px')[0]);
    if (position.x >= 0 && position.y >= 0 && position.x + width <= 1280 && position.y + height <= 720) {
      props.setBannerStyle({ height: height, width: width, x: position.x, y: position.y });
    } else {
      return;
    }
  }

  return (
    <Rnd
      style={props.style}
      size={{ width: props.bannerStyle.width, height: props.bannerStyle.height }}
      position={{ x: props.bannerStyle.x, y: props.bannerStyle.y }}
      onDragStop={(e, d) => { setOnDragStop(e, d) }}
      onResize={(e, direction, ref, delta, position) => { setOnResize(e, direction, ref, delta, position) }}
      enableResizing={props.resizing}
      disableDragging={props.disableDragging}
      lockAspectRatio={props.lockAspectRatio}
      minHeight={props.minHeight}
      minWidth={props.minWidth}
      bounds="parent"
    >Your ad!
    </Rnd>
  )
}

export default Resizable;
