import React from "react";
import "./style.css";

function DrawingLine({ line }) {
    // TODO: use https://francoisromain.medium.com/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
	const pathData =
		'M ' + line.map((p) => {return `${p.get('x')} ${p.get('y')}`}).join(' L ');
	return <path d={pathData} className="path" />;
}

export default DrawingLine;