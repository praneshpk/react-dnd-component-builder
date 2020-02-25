import React from 'react';
import Library from './Library/Library';
import Sandbox from './Sandbox/Sandbox';
import Settings from './Settings/Settings';
import { Button, Card, Badge } from '@material-ui/core';
import { ComponentWrapperProps } from './Library/ComponentWrapper/ComponentWrapper';

export default function ComponentBuilder() {
    const components: ComponentWrapperProps[] = [
        { name: 'Button Component', component: Button },
        { name: 'Card', component: Card },
        { name: 'Badge', component: Badge }
    ];
    return (
        <div className="ComponentBuilder">
            <Library components={components} />
            <Sandbox />
            <Settings />
        </div>
    )
}