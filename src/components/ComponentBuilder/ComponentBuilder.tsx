import React, { useState, useRef } from 'react';
import Library from './Library/Library';
import { ComponentWrapper, GridElement } from './Library/ComponentWrapper/ComponentWrapper';
import Sandbox from './Sandbox/Sandbox';
import Settings from './Settings/Settings';
import { Button, Card, Badge } from '@material-ui/core';
import './ComponentBuilder.scss';

export default function ComponentBuilder() {
    const defaultGrid = {
        __grid__: {
            x: 1,
            y: 1,
            w: 8,
            h: 2,
        } as GridElement
    };

    const [sandbox, setSandbox] = useState<object>({});
    const [focus, setFocus] = useState();
    const currentGridElement = useRef(defaultGrid.__grid__);

    const components = {
        'Button': {
            component: Button,
            props: {
                variant: 'contained',
                color: 'primary',
                ...defaultGrid,
            },
            propTypes: {
                variant: ['text', 'outlined', 'contained'],
                size: ['small', 'medium', 'large']
            },
            children: ['Button Component'],

        },
        'Card': {
            component: Card,
            props: defaultGrid,
            children: ['Card Component'],
        },
        'Badge': {
            component: Badge,
            props: defaultGrid,
            children: ['Badge Component']
        }
    };
    const addToSandbox = (id, element, grid: GridElement) => {
        const component = (
            <ComponentWrapper
                grid={grid}
                key={id}
                onClick={() => { setFocus(id); }}
                draggable={true}
            >
                {element}
            </ComponentWrapper>
        );
        setSandbox({ ...sandbox, [id]: component });
        setFocus(id);
    };
    return (
        <div className="ComponentBuilder">
            <Library
                components={components}
                grid={currentGridElement}
            />
            <Sandbox
                gridSize={48}
                components={components}
                addToSandbox={addToSandbox}
                grid={currentGridElement}
            >
                {sandbox}
            </Sandbox>
            <Settings
                components={components}
                sandbox={sandbox}
                setSandbox={setSandbox}
                addToSandbox={addToSandbox}
                focus={focus}
                setFocus={setFocus}
            />
        </div>
    )
}