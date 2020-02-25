import React from 'react';
import './Library.scss';
import { ComponentWrapperProps, ComponentWrapper } from './ComponentWrapper/ComponentWrapper';

export default function Library({ components }: { components: ComponentWrapperProps[] }) {

    return (
        <div className="Library">
            {components.map(e =>
                <ComponentWrapper>{e}</ComponentWrapper>)
            }
        </div>
    )
}