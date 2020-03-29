import React from 'react';
import { generateKey } from '../../Library/Library';

export default function importJSON(json, components) {
    const jsonArray = JSON.parse(json);
    let sandbox = {};
    jsonArray.forEach(e => {
        const key = Object.keys(e)[0];
        const el = components[key];
        console.log(e[key]);
        const id = generateKey(Object.keys(e)[0]);
        sandbox[id] = React.createElement(
            el.component, { ...e[key].props, id, key: id }, e[key].children);
    });
    return sandbox
}