import React, { useState } from 'react';
import './Sandbox.scss';

export default function Sandbox({ components }) {
    const [children, setChildren] = useState(Array());

    function dragOver(evt) {
        evt.preventDefault();
    }
    function drop(evt) {
        evt.preventDefault();
        const key = evt.dataTransfer.getData('component');
        const el = components[key];
        setChildren([...children, React.createElement(el.component, el.props, el.children)]);
    }
    return (
        <div className="Sandbox" onDragOver={dragOver} onDrop={drop}>
            {children}
        </div>
    )
}