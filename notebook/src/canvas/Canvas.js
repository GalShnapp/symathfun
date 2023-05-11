import * as React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import axios from "axios";
import appAuth from "../secrets/Secrets";

const base64ToLatex = (base64) => {
    const headers = { 
        ...appAuth,
        'Content-type': 'application/json'
    };

    const data = {
        'url': base64
    }
    axios.post('https://api.mathpix.com/v3/latex', data, { headers })
        .then(response => console.log(response));
}

const Canvas = class extends React.Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
  }

  render() {
    return (
      <div>
        <ReactSketchCanvas
          ref={this.canvas}
          strokeWidth={5}
          strokeColor="black"
        />
        <button
          onClick={() => {
            this.canvas.current
              .exportImage("jpeg")
              .then((data) => {
                base64ToLatex(data);
              })
              .catch((e) => {
                console.log(e);
              });
          }}
        >
          Get Image
        </button>
      </div>
    );
  }
};

export default Canvas;
