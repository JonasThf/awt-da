import React from "react";
import './Television.css'
import Box from '@mui/material/Box';
import Resizable from "./Resizable";

const Television = (props) => {

    return (
        <div id="television">
            {props.bannerState === '1' ? <Resizable setResizer={props.setResizer} safeArea={document.getElementById('safe-area')}></Resizable> : null}
            {props.bannerState === '2' ? <div id="l-banner">Broadcast</div> : null}
            {props.bannerState === '3' ? <div id="half-screen-top">AD</div> : null}
            {props.previewLBanner}
            <div id="safe-area">
                <Box id="safebox" sx={{ backgroundColor: '#e0e0e0' }}>Safe Area</Box>
            </div>
            {props.preview}
        </div>
    )
}

export default Television;
