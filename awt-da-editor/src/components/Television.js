import React from "react";
import './Television.css';
import Resizable from "./Resizable";

const Television = (props) => {

    const standardBannerStyle = {
        color: "#FFFFFF",
        fontSize: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "solid 1px #000000",
        background: "#0d6efd",
    };

    const LBannerStyle = {
        position: "absolute",
        color: "#FFFFFF",
        fontSize: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0d6efd",
    };

    const standardBannerResizing = { top: true, right: true, bottom: true, left: true, topRight: true, bottomRight: true, bottomLeft: true, topLeft: true };
    const LBannerResizing = { top: false, right: false, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: true, topLeft: false };

    return (
        <div id="television">
            {props.bannerState === '1' ? <Resizable minHeight={67} minWidth={126} lockAspectRatio={false} disableDragging={false} style={standardBannerStyle} bannerStyle={props.standardBanner} setBannerStyle={props.setStandardBanner} resizing={standardBannerResizing}></Resizable> : null}
            {props.bannerState === '2' ? <Resizable minHeight={215} minWidth={381} lockAspectRatio={'16/9'} disableDragging={true} style={LBannerStyle} bannerStyle={props.LBanner} setBannerStyle={props.setLBanner} resizing={LBannerResizing}>Broadcast</Resizable> : null}
            {props.bannerState === '3' ? <div id="half-screen-top">Your ad!</div> : null}
            {props.bannerState === '4' ? <div id="half-screen-bottom">Your ad!</div> : null}
            {props.previewLBanner}
            {props.preview}
        </div>
    )
}

export default Television;
