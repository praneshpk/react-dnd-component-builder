import React, { useRef } from 'react';

export function ComponentWrapper({ children }) {
    function drag(evt) {
        console.log('dragging ' + children);
        evt.dataTransfer.setData("component", children);
    }

    return (
        <div className="ComponentWrapper" draggable="true" onDragStart={drag}>
            {children}
        </div>
    )
}