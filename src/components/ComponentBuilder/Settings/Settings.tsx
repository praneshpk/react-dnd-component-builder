import React, { useState, useEffect, useRef } from 'react';
import { createProperties, exportSandboxToJSON } from './Util';
import './Settings.scss';
import { parseKey } from '../Library/Library';
import importJSON from './Util/Import';

export default function Settings({
    components, sandbox, setSandbox, addToSandbox, focus, setFocus
}) {
    const [content, setContent] = useState(<h2>Settings panel</h2>);
    const [json, setJson] = useState('Click export to see JSON code');
    const [dirty, setDirty] = useState(false);
    const [error, setError] = useState(false);
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
        if (!(focus in sandbox)) {
            return <h2>Settings panel</h2>;
        }
        console.log(sandbox);
        const wrapper = sandbox[focus].props.children;
        const props = { ...wrapper.props, grid: sandbox[focus].props.grid };
        const { id } = props;
        const key = parseKey(id)[0];
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
                        <h3 className={`${dirty ? 'dirty' : ''}`}>
                            {`Embed${dirty ? '*' : ''}`}
                        </h3>
                        <button onClick={() => {
                            if (dirty) {
                                let res;
                                try {
                                    res = importJSON(json, components);
                                } catch (e) {
                                    if (e.name === 'SyntaxError') {
                                        console.error(`Error in embedded JSON: ${e.message}`);
                                    } else {
                                        console.error('Internal error. Please file a bug report to developer')
                                    }
                                    setError(true);
                                    return;
                                }
                                setDirty(false);

                                setSandbox({});
                                Object.keys(res).forEach(e => {
                                    console.log(res[e])
                                    addToSandbox(e, res[e]);
                                });
                                // setSandbox(res);
                            } else {
                                code.current?.select();
                                document.execCommand('copy');
                                document.getSelection()?.removeAllRanges();
                            }
                        }}>{dirty ? 'Save' : 'Copy to Clipboard'}</button>
                        <textarea
                            ref={code}
                            className={`${dirty ? 'dirty' : ''}${error ? ' error' : ''}`}
                            cols={80}
                            rows={15}
                            value={json}
                            onChange={(e) => {
                                setError(false);
                                setDirty(true);
                                setJson(e.target.value);
                            }} />
                    </div>
                </div>
            </div>
        );
    }
    useEffect(() => {
        if (!dirty) {
            setJson(exportSandboxToJSON(sandbox));
        }
        setContent(createSettings());
    }, [focus, sandbox, json, dirty, error]);

    return (
        <div className="Settings" onDrop={drop} onDragOver={dragOver} onDragLeave={dragLeave}>
            <div className="content">
                {content}
            </div>
        </div>
    )
}