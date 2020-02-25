import React, { useRef } from 'react';

export interface ComponentWrapperProps {
    name: string,
    component: any,
    props?: any
}

export function ComponentWrapper({ children }: { children: ComponentWrapperProps }) {
    function drag(evt) {
        console.log('dragging ' + children.name);
        evt.dataTransfer.setData("component", children);
    }

    return (
        <div className="ComponentWrapper" draggable="true" onDrag={drag}>
            {children.name}
        </div>
    )
}