import React, { useState, useEffect } from 'react';
import { exportToJSON } from '../../Settings/Util';

import './ComponentWrapper.scss';
export interface GridElement {
    x: number,
    y: number,
    w: number,
    h: number
}
export interface ComponentWrapperProps {
    children?: any,
    grid?: GridElement,
    onClick?: () => void,
    drop?: boolean,
    draggable?: boolean
}
export function ComponentWrapper({
    children, grid, onClick = () => { }, drop = true, draggable = false
}: ComponentWrapperProps) {
    const [droppable, setDroppable] = useState(false);
    const [dragging, setDragging] = useState(false);

    function dragStart(evt) {
        onClick();
        setDragging(true);
        if (typeof children === 'string' || children instanceof String) {
            evt.dataTransfer.setData("component", children);
        } else {
            evt.dataTransfer.setData('component', children.props.id);
        }
    }
    let enterTarget: any = null;
    let classList = (droppable ? ' droppable' : '') + (dragging ? ' dragging' : '');
    return (
        <div className={`ComponentWrapper${classList}`}
            style={grid ? {
                gridColumnStart: grid.x,
                gridColumnEnd: grid.x + grid.w,
                gridRowStart: grid.y,
                gridRowEnd: grid.y + grid.h,
                overflow: 'hidden'
            } : {}}
            data-grid={JSON.stringify(grid)}
            draggable={draggable}
            onDragStart={dragStart}
            // onDragOver={(evt) => {
            //     if (!dragging && drop) {
            //         evt.preventDefault();
            //         evt.stopPropagation();
            //         enterTarget = evt.target;
            //         setDroppable(true);
            //     }
            // }}
            // onDragLeave={(evt) => {
            //     if (evt.target === enterTarget) {
            //         evt.stopPropagation();
            //         evt.preventDefault();
            //         setDroppable(false);
            //     }
            // }}
            onDrop={(evt) => setDroppable(false)}
            onClick={onClick}
            onDragEnd={(evt) => setDragging(false)}
        >
            {children}
        </div >
    )
}