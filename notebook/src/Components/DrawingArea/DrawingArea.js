import React from "react";
import Immutable from "immutable";
import Drawing from "./Drawing";
import "./style.css";

const DrawingArea = (props) => {
    /*
        TODO:
            1. export to base64 and send to OCR:
                import ReactDOMServer from 'react-dom/server';
                export function encodeSvg(reactElement) {
                    return 'data:image/svg+xml,' + escape(ReactDOMServer.renderToStaticMarkup((reactElement)));
                }
            2. fix bounding box logic:
                a. make it work
                b. send BB to OCR.
            3. refactor using a reducer
            4. make reset button on DBG mode only.
    */
    const [state, setState] = React.useState({
        isDrawing: false,
        lines: Immutable.List(),
        bBtop: 1000,
        bBleft: 1000,
        bBbottom: 0,
        bBright: 0,
    });

    const drawingAreaRef = React.useRef();
    React.useEffect(() => {
        const tid = setTimeout(() => {
            if (state.isDrawing) return;

            setState((prev) => {
                console.log(prev.bBbottom);
                console.log(prev.bBtop);
                console.log(prev.bBleft);
                console.log(prev.bBright);
                return {
                    isDrawing: false,
                    bBtop: 1000,
                    bBleft: 1000,
                    bBbottom: 0,
                    bBright: 0,
                    lines: prev.lines.push(
                        Immutable.List([
                            Immutable.Map({
                                x: prev.bBleft,
                                y: prev.bBtop,
                            }),
                            Immutable.Map({
                                x: prev.bBright,
                                y: prev.bBtop,
                            }),
                            Immutable.Map({
                                x: prev.bBright,
                                y: prev.bBbottom,
                            }),
                            Immutable.Map({
                                x: prev.bBleft,
                                y: prev.bBbottom,
                            }),
                            Immutable.Map({
                                x: prev.bBleft,
                                y: prev.bBtop,
                            }),
                        ])
                    ),
                };
            });
        }, 500);

        if (!state.isDrawing) {
        }
        return () => {
            clearTimeout(tid);
        };
    }, [state.isDrawing]);

    const relativeCoordinatesForEvent = (mouseEvent) => {
        const boundingRect = drawingAreaRef.current.getBoundingClientRect();

        return new Immutable.Map({
            x: mouseEvent.clientX - boundingRect.left,
            y: mouseEvent.clientY - boundingRect.top,
        });
    };

    const handleClicky = (event) => {
        setState((prevState) => {
            return {
                isDrawing: false,
                lines: Immutable.List(),
                bBtop: 1000,
                bBleft: 1000,
                bBbottom: 0,
                bBright: 0,
            };
        });
    };

    const handleMouseDown = (mouseEvent) => {
        if (mouseEvent.button !== 0) {
            return;
        }

        const point = relativeCoordinatesForEvent(mouseEvent);
        setState((prevState) => {
            console.log(prevState.bBbottom);
            console.log(prevState.bBtop);
            console.log(prevState.bBleft);
            console.log(prevState.bBright);
            console.log(point.get('x'))
            return {
                bBtop: Math.max(point.get('y'), prevState.bBtop),
                bBleft: Math.min(point.get('x'), prevState.bBleft),
                bBbottom: Math.min(point.get('y'), prevState.bBbottom),
                bBright: Math.max(point.get('x'), prevState.bBright),
                lines: prevState.lines.push(Immutable.List([point])),
                isDrawing: true,
            };
        });
    };

    const handleMouseMove = (mouseEvent) => {
        if (!state.isDrawing) {
            return;
        }

        const point = relativeCoordinatesForEvent(mouseEvent);

        setState((prevState) => {
            return {
                bBtop: Math.max(point.get('y'), prevState.bBtop),
                bBleft: Math.min(point.get('x'), prevState.bBleft),
                bBbottom: Math.min(point.get('y'), prevState.bBbottom),
                bBright: Math.max(point.get('x'), prevState.bBright),
                isDrawing: true,
                lines: prevState.lines.updateIn(
                    [prevState.lines.size - 1],
                    (line) => line.push(point)
                ),
            };
        });
    };

    const handleMouseUp = (e) => {
        setState((prevState) => {
            return {
                lines: prevState.lines,
                isDrawing: false,
                bBtop: prevState.bBtop,
                bBleft: prevState.bBleft,
                bBbottom: prevState.bBbottom,
                bBright: prevState.bBright,
            };
        });
    };

    return (
        <div
            className="drawArea"
            ref={drawingAreaRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <button onClick={handleClicky}>Reset Button FTW!</button>
            <Drawing lines={state.lines} />
        </div>
    );
};

export default DrawingArea;
