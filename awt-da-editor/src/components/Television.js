import React from "react";
import './Television.css'
import { propTypes } from "react-bootstrap/esm/Image";
import Box from '@mui/material/Box';
import Image from 'react-bootstrap/Image';
// import {Resizable, ResizableBox} from 'react-resizable';
import Resizable from "./Resizable";




const Television = (props) => {

    const [resizer, setResizer] = React.useState({
        width: 200,
        height: 200,
        x: 10,
        y: 10});

    const [size, setSize] = React.useState({width: 200, height: 200});

    const onResize = (event, {element, size, handle}) => {
        this.setSize({width: size.width, height: size.height});
    };

    const MyHandle = (props) => {
        return <div ref={props.innerRef} className="foo" {...props} />;
    };
    

    return(
        <div id="television">
            {/* <Panel></Panel> */}
            <div id="safearea">
                <Image fluid src={props.frontImg} id="img"></Image>
                {/* <Resizable height={this.size.height} width={this.size.width} onResize={this.onResize}> */}
                {/* <ResizableBox  width={300} height={300} draggableOpts={{...props}}
                        minConstraints={[100, 100]} maxConstraints={[300, 300]}> */}
                {/* <Resizable handle={(handleAxis, ref) => <MyHandle innerRef={ref} className={`foo handle-${handleAxis}`} {...props} />}><div>Test</div></Resizable> */}
                {/* <ResizableBox className="box" width={200} height={200}>
                    <span className="text">{"<ResizableBox>, same as above."}</span>*/}
                     {/* <Draggable> */}
                    {/* <Resizable></Resizable> */}
                { props.bannerState === "2" ? <div id="l-banner"></div> : null }
                <Box id="safebox" sx={{backgroundColor: '#e0e0e0', width: 200, height: 200}}>Safe Area</Box>
                    {/* <Panel setPanelRef={props.setPanelRef}>Panel 1</Panel> */}
                    {/* </Draggable>  */}
                {/* </ResizableBox> */}
                {/* </Resizable> */}
            </div>
            


        </div>
    )








}

export default Television;