import React, { useState, useEffect, useRef, useLayoutEffect, MutableRefObject } from 'react';
import './Sandbox.scss';

import { generateKey, parseKey } from '../Library/Library';
import { ComponentWrapper, GridElement } from '../Library/ComponentWrapper/ComponentWrapper';

export interface Props {
    components: object,
    children?: object,
    addToSandbox: (id: string, element: React.ReactNode) => void,
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
    const useGrid = useRef<any[]>([]);

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
            const children = Array.from(content.current.children);
            const index = children.indexOf(evt.target);

            const checkGrid = (dropState) => {
                for (let y = 0; y < grid.current.h; y++) {
                    for (let x = 0; x < grid.current.w; x++) {
                        let i = index + (x + y * contentWidth);
                        if (i > children.length - 1) {
                            return dropState;
                        }
                        const element = children[i] as HTMLElement;
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
                        // if (dropState === DROP.ERR && (index + x + 1) % contentWidth === 0) {
                        //     break;
                        // }
                    }
                }
                return dropState;
            }
            if ((index % contentWidth + grid.current.w) > contentWidth) {
                dropState = checkGrid(DROP.ERR);
            } else {
                for (let y = 0; y < grid.current.h; y++) {
                    for (let x = 0; x < grid.current.w; x++) {
                        const element = children[index + (x + y * contentWidth)] as HTMLElement;
                        console.log(useGrid.current, useGrid.current[index + (x + y * contentWidth)]);
                        if (!element) {
                            dropState = DROP.ERR;
                            resetClassState(content.current);
                            return;
                        } else if (useGrid.current[index + (x + y * contentWidth)]) {
                            dropState = checkGrid(DROP.ERR);
                            return;
                            // if (element.style.visibility === 'hidden') {
                            //     dropState = checkGrid(DROP.ERR);
                            //     return;
                            // }
                        }
                        // else if (element.classList.contains('ComponentWrapper')) {
                        //     dropState = checkGrid(DROP.CHILD);
                        //     return;
                        // }
                    }
                }
                dropState = checkGrid(DROP.OK);
            }
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
                    let index = children.indexOf(evt.target);
                    for (let y = 0; y < __grid__.h; y++) {
                        for (let x = 0; x < __grid__.w; x++) {
                            useGrid.current[index + (x + y * contentWidth)] = true;
                            // const child = children[index + (x + y * contentWidth)] as HTMLElement;
                            // if (child) {

                            //     child.style.visibility = "hidden";// .remove();
                            // }
                        }
                    }
                    console.log(useGrid.current);
                }
                const targetGrid = JSON.parse(evt.target.dataset.grid);
                const element = React.createElement(el.component, { ...props, id, key: id, grid: { ...__grid__, x: targetGrid.x, y: targetGrid.y } }, el.children);
                addToSandbox(id, element);
            }
        }

    }
    useLayoutEffect(() => {
        if (content.current) {
            setContentWidth(Math.floor(parseInt(window.getComputedStyle(content.current).width) / gridSize));
            setContentHeight(Math.floor(parseInt(window.getComputedStyle(content.current).height) / gridSize));
        }
        if (contentWidth > 0) {
            let len = contentWidth * contentHeight;
            // if (content.current) {
            //     console.log(content.current.children.indexOf());
            // }
            useGrid.current = Array(len).fill(false);
            setPlaceholders(Array(len).fill(0).map((e, i) => {
                const newGrid = { x: (i % contentWidth) + 1, y: Math.floor(i / contentWidth) + 1, w: 1, h: 1 };
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