import React, { useState, useEffect, useRef, useLayoutEffect, MutableRefObject } from 'react';
import './Sandbox.scss';

import { generateKey, parseKey } from '../Library/Library';
import { ComponentWrapper, GridElement } from '../Library/ComponentWrapper/ComponentWrapper';

export interface Props {
    components: object,
    children?: object,
    addToSandbox: (id: string, element: React.ReactNode, grid: GridElement) => void,
    gridSize: 12 | 24 | 48,
    grid: MutableRefObject<GridElement>,
}
const DROP = {
    OK: 0,
    ERR: 1,
    CHILD: 2,
}
export default function Sandbox({
    components, children = {}, addToSandbox, gridSize, grid
}: Props) {
    useEffect(() => {
    });
    const [contentWidth, setContentWidth] = useState(0);
    const [contentHeight, setContentHeight] = useState(0);
    const [placeholders, setPlaceholders] = useState<any[]>([]);

    const content = useRef<HTMLDivElement>(null);

    let dropState = DROP.ERR;

    const resetClassState = (parent: HTMLDivElement | null) => {
        if (parent) {
            Array.from(parent.children).forEach(e => {
                e.classList.remove('drop', 'error', 'child');
            });
        }
    }

    function dragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        if (content.current) {
            let children = Array.from(content.current.children);
            let index = children.indexOf(evt.target);

            const checkGrid = (dropState) => {
                for (let y = 0; y < grid.current.h; y++) {
                    for (let x = 0; x < grid.current.w; x++) {
                        const element = children[index + (x + y * Math.floor(contentWidth / gridSize))] as HTMLElement;
                        switch (dropState) {
                            case DROP.OK:
                                element.classList.add('drop');
                                break;
                            case DROP.ERR:
                                element.classList.add('error');
                                break;
                            case DROP.CHILD:
                                element.classList.add('child');
                                return dropState;
                            default:
                                console.log(dropState);
                                break;
                        }
                    }
                }
                return dropState;
            }

            for (let y = 0; y < grid.current.h; y++) {
                for (let x = 0; x < grid.current.w; x++) {
                    const element = children[index + (x + y * Math.floor(contentWidth / gridSize))] as HTMLElement;
                    if (!element) {
                        dropState = DROP.ERR;
                        resetClassState(content.current);
                        return;
                    } else if (element.classList.contains('placeholder')) {
                        if (element.style.visibility === 'hidden') {
                            dropState = checkGrid(DROP.ERR);
                            return;
                        }
                    } else if (element.classList.contains('ComponentWrapper')) {
                        dropState = checkGrid(DROP.CHILD);
                        return;
                    }
                }
            }
            dropState = checkGrid(DROP.OK);
        }
    }

    function dragLeave(evt) {
        resetClassState(content.current);
    }

    function drop(evt) {
        evt.preventDefault();
        resetClassState(content.current);
        const key = evt.dataTransfer.getData('component');
        if (key) {
            const split = parseKey(key);
            let id = key;
            const el = components[split[0]];
            let add = true;
            if (split.length === 1) {
                id = generateKey(key);
            } else if (key in children) {
                console.log('moving... needs to be implemented');
                add = false;
            }

            if (add && dropState !== DROP.ERR) {
                if (dropState === DROP.CHILD) {
                    console.log('child... needs to be implemented');
                    return;
                }
                const { __grid__, ...props } = el.props;
                // remove placeholders
                if (content.current) {
                    let children = Array.from(content.current.children);
                    //let e = evt.target;
                    let index = children.indexOf(evt.target);
                    for (let y = 0; y < __grid__.h; y++) {
                        for (let x = 0; x < __grid__.w; x++) {
                            const child = children[index + (x + y * Math.floor(contentWidth / gridSize))] as HTMLElement;
                            if (child) {
                                child.style.visibility = "hidden";// .remove();
                            }
                        }
                    }
                }
                const targetGrid = JSON.parse(evt.target.dataset.grid);
                const element = React.createElement(el.component, { ...props, id, key: id }, el.children);
                addToSandbox(id, element, { ...__grid__, x: targetGrid.x, y: targetGrid.y });
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
                const newGrid = { x: (i % width) + 1, y: Math.floor(i / width) + 1, w: 1, h: 1 };
                return (
                    <ComponentWrapper
                        key={`placeholder-${i}`}
                        className={['placeholder']}
                        grid={newGrid}
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