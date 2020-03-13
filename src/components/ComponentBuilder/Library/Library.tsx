import React from 'react';
import './Library.scss';
import { ComponentWrapper } from './ComponentWrapper/ComponentWrapper';

export const generateKey = prefix => `${prefix}__${Date.now()}`;

export const parseKey = key => key.split('__');

export default function Library({ components, grid }) {
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
                    onClick={() => grid.current = components[e].props.__grid__}>
                    {e}
                </ComponentWrapper>)
            }
        </div>
    )
}