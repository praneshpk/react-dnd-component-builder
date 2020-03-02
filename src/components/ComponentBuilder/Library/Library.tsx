import React from 'react';
import './Library.scss';
import { ComponentWrapper } from './ComponentWrapper/ComponentWrapper';

export default function Library({ components }) {

    return (
        <div className="Library">
            {Object.keys(components).map(e =>
                <ComponentWrapper>{e}</ComponentWrapper>)
            }
        </div>
    )
}