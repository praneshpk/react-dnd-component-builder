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
            <h3>Components</h3>
            {Object.keys(components).map(e =>
                <ComponentWrapper
                    key={generateKey(e)}
                    drop={false}
                    draggable={true}
                >
                    {e}
                </ComponentWrapper>)
            }
        </div>
    )
}