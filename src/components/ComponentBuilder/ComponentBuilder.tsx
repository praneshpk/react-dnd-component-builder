import React from 'react';
import Library from './Library/Library';
import Sandbox from './Sandbox/Sandbox';
import Settings from './Settings/Settings';
import { Button, Card, Badge } from '@material-ui/core';

export default function ComponentBuilder() {
    const components = {
        'Button': {
            component: Button,
            props: [],
            children: ['Button Component']
        },
        'Card': {
            component: Card,
            props: [],
            children: ['Card Component']
        },
        'Badge': {
            component: Badge,
            props: [],
            children: ['Badge Component']
        }
    };
    return (
        <div className="ComponentBuilder">
            <Library components={components} />
            <Sandbox components={components} />
            <Settings />
        </div>
    )
}