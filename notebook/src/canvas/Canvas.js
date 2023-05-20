import * as React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import axios from "axios";
import appAuth from "../secrets/Secrets";

const base64ToLatex = (base64) => {
    const headers = {
        ...appAuth,
        "Content-type": "application/json",
    };

    const data = {
        url: base64,
    };
    axios
        .post("https://api.mathpix.com/v3/latex", data, { headers })
        .then((response) => {
            console.log(response.data.latex)
            fetch("http://localhost:8000/row", {
                method: "POST",
                headers: { "Content-Type": "application/json",
                'accept': 'application/json'
               },
                body: JSON.stringify({
                  latex: response.data.latex,
              }),
            })
            .catch((error) => {
              console.error(error)
            });
        });
};

const Canvas = class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bBtop: 10000,
            bBleft: 10000,
            bBbottom: 0,
            bBright: 0,
            sketchTime: 0,
        }
        
        this.canvas = React.createRef();
        this.sketchCanvas = <ReactSketchCanvas
        ref={this.canvas}
        strokeWidth={2}
        strokeColor="black"
        onStroke={this.boo}
        withTimestamp={true}
    />
    }

    boo = (arg) => {
        console.log(arg)
        return
        let maxX = this.state.bBright 
        let maxY = this.state.bBbottom
        let minX = this.state.bBleft 
        let minY = this.state.bBright
        arg.paths.forEach((path) => {
            const x = path.x
            const y = path.y
            if (x > maxX) maxX = x;
            if (x > minX) minX = x;
            if (y > maxY) maxY = y;
            if (y > minY) minY = y;
        })
    }

    render() {
        return (<>
                {this.sketchCanvas}
                <button
                    onClick={() => {
                        this.canvas.current
                            .exportImage("jpeg")
                            .then((data) => {
                                console.log(data)
                                base64ToLatex(data);
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                    }}
                >
                    Get Image
                </button>
                </>
        );
    }
};

export default Canvas;
