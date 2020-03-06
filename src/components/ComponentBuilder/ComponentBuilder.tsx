import React, { useState, Children } from 'react';
import Library from './Library/Library';
import { ComponentWrapper } from './Library/ComponentWrapper/ComponentWrapper';
import Sandbox from './Sandbox/Sandbox';
import Settings from './Settings/Settings';
import { Button, Card, Badge } from '@material-ui/core';
import './ComponentBuilder.scss';

export default function ComponentBuilder() {
    const [sandbox, setSandbox] = useState<object>({});
    const [focus, setFocus] = useState();

    const components = {
        'Button': {
            component: Button,
            props: {
                variant: 'contained',
                color: 'primary'
            },
            propTypes: {
                variant: ['text', 'outlined', 'contained'],
                size: ['small', 'medium', 'large']
            },
            children: ['Button Component']
        },
        'Card': {
            component: Card,
            props: {},
            children: ['Card Component']
        },
        'Badge': {
            component: Badge,
            props: {},
            children: ['Badge Component']
        }
    };
    const addToSandbox = (id, element) => {
        const component = (
            <ComponentWrapper key={id} onClick={() => { setFocus(id); }}>
                {element}
            </ComponentWrapper>
        );
        setSandbox({ ...sandbox, [id]: component });
        setFocus(id);
    };
    return (
        <div className="ComponentBuilder">
            <Library components={components} />
            <Sandbox
                components={components}
                addToSandbox={addToSandbox}
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