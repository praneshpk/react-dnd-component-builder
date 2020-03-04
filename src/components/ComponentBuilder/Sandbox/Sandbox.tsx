import React, { useState } from 'react';
import './Sandbox.scss';
import { ComponentWrapper } from '../Library/ComponentWrapper/ComponentWrapper';

import { generateKey } from '../Library/Library';
export interface Props {
    components: object,
    children: any,
    setChildren: (children: any[]) => void
}
export default function Sandbox({ components, children = [], setChildren }: Props) {
    //const [children, setChildren] = useState(Array());

    function dragOver(evt) {
        evt.preventDefault();
    }
    function drop(evt) {
        evt.preventDefault();
        const key = evt.dataTransfer.getData('component');
        if (key) {
            const split = key.split('_');
            let elid = key;
            const el = components[split[0]];
            if (split.length > 1) {
                if (!children.some(e => e.key === key)) {
                    const element = React.createElement(el.component, { ...el.props, elid }, el.children);
                    setChildren([
                        ...children,
                        (<ComponentWrapper key={elid}>{element}</ComponentWrapper>)
                    ]);
                } else {
                    console.log('just moving');
                }
            } else {
                elid = generateKey(key);
                const element = React.createElement(el.component, { ...el.props, elid }, el.children);
                setChildren([
                    ...children,
                    (<ComponentWrapper key={elid}>{element}</ComponentWrapper>)
                ]);
            }
        }

    }
    return (
        <div className="Sandbox" onDragOver={dragOver} onDrop={drop}>
            <div className="content">
                {children}
            </div>
        </div>
    )
}