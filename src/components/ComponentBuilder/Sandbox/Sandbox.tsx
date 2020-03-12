import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import './Sandbox.scss';

import { generateKey } from '../Library/Library';
import { ComponentWrapper, GridElement } from '../Library/ComponentWrapper/ComponentWrapper';
export interface Props {
    components: object,
    children?: object,
    addToSandbox: (id: string, element: React.ReactNode, grid: GridElement) => void,
    gridSize: 12 | 24 | 48
}
export default function Sandbox({ components, children = {}, addToSandbox, gridSize }: Props) {
    useEffect(() => {
    });
    const [contentWidth, setContentWidth] = useState(0);
    const [contentHeight, setContentHeight] = useState(0);
    const [placeholders, setPlaceholders] = useState<any[]>([]);
    const content = useRef<HTMLDivElement>(null);
    function dragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        console.log(evt.dataTransfer);
        console.log(JSON.parse(evt.target.dataset.grid));
    }

    function dragLeave(evt) {
    }

    function drop(evt) {
        evt.preventDefault();
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
                addToSandbox(id, element, el.props.$grid);
            }
        }

    }
    useLayoutEffect(() => {
        if (content.current) {
            setContentWidth(parseInt(window.getComputedStyle(content.current).width));
            setContentHeight(parseInt(window.getComputedStyle(content.current).height));
            // console.log(Math.floor(contentWidth / gridSize));
        }
        if (contentWidth > 0) {
            let width = Math.floor(contentWidth / gridSize);
            let height = Math.floor(contentHeight / gridSize);
            let len = width * height;
            setPlaceholders(Array(len).fill(0).map((e, i) => {
                return (
                    <ComponentWrapper
                        key={`placeholder-${i}`}
                        grid={{ x: (i % width) + 1, y: Math.floor(i / width) + 1, w: 1, h: 1 }}
                    >
                        {i}
                    </ComponentWrapper>
                );
            }));
        }
    }, [contentWidth, contentHeight, children])
    return (
        <div className="Sandbox"
            onDragOver={dragOver}
            onDragLeave={dragLeave}
            onDrop={drop}>
            <div ref={content} className={`content Grid-${gridSize}`}>
                {Object.values(children)}
                {placeholders}
            </div>
        </div>
    )
}