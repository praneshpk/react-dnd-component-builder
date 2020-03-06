import React, { useState, useEffect } from 'react';
import './Settings.scss';

export default function Settings({
    components, sandbox, setSandbox, addToSandbox, focus, setFocus
}) {
    const [content, setContent] = useState(<h2>Settings panel</h2>);

    function drop(evt) {
        const { [focus]: value, ...newSandbox } = sandbox;
        setSandbox(newSandbox);
        setContent(<h2>Settings panel</h2>);
        setFocus();
    }
    function dragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        setContent(<h2>Drag here to delete!</h2>);
    }
    function dragLeave(evt) {
        setContent(focus ? createSettings() : <h2>Settings panel</h2>);

    }
    function createSettings() {
        const props = sandbox[focus].props.children.props;
        const { id } = props;
        const key = id.split('_')[0];
        const propTypes = components[key].propTypes;
        let options: React.ReactNode[] = [];

        if (propTypes) {
            for (const [k, v] of Object.entries(propTypes)) {
                if (Array.isArray(v)) {
                    const onChange = (evt) => {
                        const element = React.createElement(
                            components[key].component,
                            { ...props, [k]: evt.target.value },
                            props.children
                        );
                        addToSandbox(id, element);
                    };
                    const settingsId = `${k}-settings`;
                    options.push(
                        <div key={settingsId}>
                            <label htmlFor={settingsId}>{k}</label>
                            <select id={settingsId} onChange={onChange} value={props[k]}>
                                {v.map(e => <option key={e} value={e}>{e}</option>)}
                            </select>
                        </div>
                    );
                }
            }
        }
        return (
            <div>
                <h2>{`${key} Settings`}</h2>
                {options}
            </div>
        );
    }
    useEffect(() => {
        if (focus) {
            setContent(createSettings());
        }
    }, [focus, sandbox]);

    return (
        <div className="Settings" onDrop={drop} onDragOver={dragOver} onDragLeave={dragLeave}>
            <div className="content">
                {content}
            </div>
        </div>
    )
}