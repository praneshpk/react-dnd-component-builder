import React, { useState } from 'react';
import './ComponentWrapper.scss';

export function ComponentWrapper({ children, onClick = () => { }, drop = true }) {
    const [droppable, setDroppable] = useState(false);
    const [dragging, setDragging] = useState(false);
    function dragStart(evt) {
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
            draggable="true"
            onDragStart={dragStart}
            onDragOver={(evt) => {
                if (!dragging && drop) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    enterTarget = evt.target;
                    setDroppable(true);
                }
            }}
            onDragLeave={(evt) => {
                if (evt.target === enterTarget) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    setDroppable(false);
                }
            }}
            onDrop={(evt) => setDroppable(false)}
            onClick={onClick}
            onDragEnd={(evt) => setDragging(false)}
        >
            {children}
        </div >
    )
}