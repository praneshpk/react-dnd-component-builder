import React from 'react';
import './Library.scss';
import { ComponentWrapper } from './ComponentWrapper/ComponentWrapper';

export const generateKey = prefix => `${prefix}_${Date.now()}`;

export default function Library({ components }) {
    function drop(evt) {
        evt.preventDefault();
        console.log(evt);
    }
    return (
        <div className="Library" onDrop={drop}>
            {Object.keys(components).map(e =>
                <ComponentWrapper key={generateKey(e)}>{e}</ComponentWrapper>)
            }
        </div>
    )
}