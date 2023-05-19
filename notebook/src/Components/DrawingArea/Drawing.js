import React from "react";
import DrawingLine from "./DrawingLine";
import "./style.css";

const Drawing = (props) => {
	return (
		<svg className="drawing">
			{props.lines.map((line, index) => (
				<DrawingLine key={index} line={line} />
			))}
		</svg>
	);
}

export default Drawing;