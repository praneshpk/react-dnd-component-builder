import React from 'react';

export default function createProperties(props, component, addToSandbox) {
    const { id } = props;
    let options: React.ReactNode[] = [];

    if (component.propTypes) {
        for (const [k, v] of Object.entries(component.propTypes)) {
            if (Array.isArray(v)) {
                const onChange = (evt) => {
                    const element = React.createElement(
                        component.component,
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
    return options;
}