import React, { useRef } from 'react';

export function ComponentWrapper({ children }) {
    function drag(evt) {
        if (typeof children === 'string' || children instanceof String) {
            evt.dataTransfer.setData("component", children);
        } else {
            console.log(children.props.elid);
            evt.dataTransfer.setData('component', children.props.elid);
        }
    }

    return (
        <div className="ComponentWrapper" draggable="true" onDragStart={drag}>
            {children}
        </div>
    )
}