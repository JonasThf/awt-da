import React from "react";
import './Television.css'
import Box from '@mui/material/Box';
import Resizable from "./Resizable";

const Television = (props) => {

    // const [shape, setShape] = React.useState(null);
    // const [safeArea, setSafeArea] = React.useState(null);
    // const showShape = () => {
    //     if (props.bannerState === "1") {
    //         setShape(<Resizable setResizer={props.setResizer}>State 1</Resizable>);
    //     } else if (props.bannerState === "2") {
    //         setShape(<div id="l-banner">State 2</div>);
    //     } else if (props.bannerState === "3") {
    //         setShape(<div>State 3</div>);
    //     }
    //     return null;
    // }
   
    return(
        <div id="television">
            { props.bannerState === '1' ? <Resizable setResizer={props.setResizer} safeArea={document.getElementById('safe-area')}></Resizable> : null}
            { props.bannerState === '2' ? <div id="l-banner">Broadcast</div> : null}
            { props.bannerState === '3' ? <div id="half-screen-top">AD</div> : null}
            {props.previewLBanner}
            <div id="safe-area">
                <Box id="safebox" sx={{backgroundColor: '#e0e0e0'}}>Safe Area</Box>
            </div>
            {props.preview}
        </div>
    )
}

export default Television;