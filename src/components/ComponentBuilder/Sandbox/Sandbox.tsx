import React from 'react';
import './Sandbox.scss';

export default function Sandbox() {
    function dragOver(evt) {
        evt.preventDefault();
    }
    function drop(evt) {
        console.log(evt.dataTransfer);
    }
    return (
        <div className="Sandbox" onDragOver={dragOver} onDrop={drop}>

        </div>
    )
}