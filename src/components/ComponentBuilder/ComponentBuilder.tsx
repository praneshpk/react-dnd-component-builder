import React, { useState, Children } from 'react';
import Library from './Library/Library';
import Sandbox from './Sandbox/Sandbox';
import Settings from './Settings/Settings';
import { Button, Card, Badge } from '@material-ui/core';
import './ComponentBuilder.scss';

export default function ComponentBuilder() {
    const [sandbox, setSandbox] = useState<any[]>([]);
    const setChildren = (child) => {
        console.log(sandbox);
        setSandbox([...sandbox, child]);
    }
    const components = {
        'Button': {
            component: Button,
            props: {},
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
    return (
        <div className="ComponentBuilder">
            <Library components={components} />
            <Sandbox components={components} setChildren={setSandbox}>
                {sandbox}
            </Sandbox>
            <Settings setSandbox={setSandbox} sandbox={sandbox} />
        </div>
    )
}