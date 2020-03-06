import React, { useRef } from 'react';

export function ComponentWrapper({ children, onClick = () => { } }) {
    function drag(evt) {
        if (typeof children === 'string' || children instanceof String) {
            evt.dataTransfer.setData("component", children);
        } else {
            evt.dataTransfer.setData('component', children.props.id);
        }
    }

    return (
        <div className="ComponentWrapper" draggable="true" onDragStart={drag} onClick={onClick}>
            {children}
        </div>
    )
}