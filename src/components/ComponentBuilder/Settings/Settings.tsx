import React, { useState } from 'react';
import './Settings.scss';

export default function Settings({ setSandbox, sandbox }) {
    const [content, setContent] = useState('Settings panel');
    function drop(evt) {
        console.log(evt);
    }
    function dragOver(evt) {
        setContent('Drag here to delete!');
        // console.log('dragging over!', evt);
    }
    function dragLeave(evt) {
        setContent('Settings panel');
    }
    return (
        <div className="Settings" onDrop={drop} onDragOver={dragOver} onDragLeave={dragLeave}>
            <div className="content">
                {content}
            </div>
        </div>
    )
}