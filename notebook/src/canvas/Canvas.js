import * as React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

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
                console.log(data);
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
