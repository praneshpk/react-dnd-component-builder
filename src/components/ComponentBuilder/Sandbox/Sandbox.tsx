import React, { useState, useEffect } from 'react';
import './Sandbox.scss';

import { generateKey } from '../Library/Library';
export interface Props {
    components: object,
    children?: object,
    addToSandbox: (id: string, element: React.ReactNode) => void,
}
export default function Sandbox({ components, children = {}, addToSandbox }: Props) {
    const [mask, setMask] = useState(false);
    function dragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        setMask(true);
    }

    function dragLeave(evt) {
        setMask(false);
    }

    function drop(evt) {
        evt.preventDefault();
        setMask(false);
        const key = evt.dataTransfer.getData('component');

        if (key) {
            const split = key.split('_');
            let id = key;
            const el = components[split[0]];
            let add = true;
            if (split.length === 1) {
                id = generateKey(key);
            } else if (key in children) {
                console.log('just moving');
                add = false;
            }
            if (add) {
                const element = React.createElement(el.component, { ...el.props, id }, el.children);
                addToSandbox(id, element);
            }
        }

    }
    return (
        <div className={`Sandbox ${mask ? 'mask' : ''}`} onDragOver={dragOver} onDragLeave={dragLeave} onDrop={drop}>
            <div className="content">
                {Object.values(children)}
            </div>
        </div>
    )
}