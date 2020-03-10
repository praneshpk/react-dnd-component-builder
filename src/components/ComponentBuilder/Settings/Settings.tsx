import React, { useState, useEffect, useRef } from 'react';
import { createProperties, exportToJSON } from './Util';
import './Settings.scss';

export default function Settings({
    components, sandbox, setSandbox, addToSandbox, focus, setFocus
}) {
    const [content, setContent] = useState(<h2>Settings panel</h2>);
    const [json, setJson] = useState('Click export to see JSON code');
    const code = useRef<HTMLTextAreaElement>(null);

    function drop() {
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
        const propSettings = createProperties(props, components[key], addToSandbox);

        return (
            <div>
                <h2>{key}</h2>
                <div className="flex row space">
                    <div className="flex col">
                        <h3>Properties</h3>
                        <div className="grid">{propSettings}</div>
                    </div>
                    <div className="flex col">
                        <h3>Embed</h3>
                        <button onClick={() => {
                            code.current?.select();
                            document.execCommand('copy');
                            document.getSelection()?.removeAllRanges();
                        }}>Copy to Clipboard</button>
                        <textarea ref={code} cols={80} rows={15} value={json} readOnly />
                    </div>
                </div>
            </div>
        );
    }
    useEffect(() => {
        setJson(exportToJSON(sandbox))
        if (focus) {
            setContent(createSettings());
        }
    }, [focus, sandbox, json]);

    return (
        <div className="Settings" onDrop={drop} onDragOver={dragOver} onDragLeave={dragLeave}>
            <div className="content">
                {content}
            </div>
        </div>
    )
}