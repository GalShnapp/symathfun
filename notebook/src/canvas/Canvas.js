import * as React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import axios from "axios";


const base64ToLatex = (base64) => {
    const headers = { 
        'app_id': 'gal_shnapp_gmail_com_9439c6_c2248b',
        'app_key': 'b7cc65bbffe436311a2e2338e1234e07e549b191eae2d2d2af9a5c7cabcd3c25',
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
