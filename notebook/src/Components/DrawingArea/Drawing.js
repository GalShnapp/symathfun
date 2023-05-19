import React from "react";
import DrawingLine from "./DrawingLine";
import "./style.css";

const Drawing = React.forwardRef((props, ref) => {
    const svgRef = React.useRef()
    const svgToJPEG = () => {
        if (svgRef.current) {
            const canvasSketch = `data:image/svg+xml;base64,${btoa(
                svgRef.current.outerHTML
              )}`;
              var canvas = document.createElement('canvas');
              const dim = 1000;
              canvas.height = dim;
              canvas.width = dim;
              var ctxt = canvas.getContext('2d');
              var img = document.createElement('img');
              img.setAttribute('src', canvasSketch);


              return new Promise(resolve => {
                img.onload = () => {
                  ctxt.drawImage(img, 0, 0);
                  const file = canvas.toDataURL(`image/'jpeg'`);
                  resolve(file);
                };
              });
        } else {
            console.log("SVG element is not ready yet.");
        }
    };
    React.useImperativeHandle(ref, ()=>{
        return {
            svgToJPEG: svgToJPEG
        }
    })
    return (
        <svg className="drawing" ref={svgRef} id="gaba" >
            {props.lines.map((line, index) => (
                <DrawingLine key={index} line={line} />
            ))}
        </svg>
    );
})

export default Drawing;