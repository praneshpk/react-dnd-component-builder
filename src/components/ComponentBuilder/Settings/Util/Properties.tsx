import React from 'react';

export default function createProperties(props, component, addToSandbox) {
    const { id } = props;
    let options: React.ReactNode[] = [];

    if (component.propTypes) {
        for (const [k, v] of Object.entries(component.propTypes)) {
            if (Array.isArray(v)) {
                const onChange = (evt) => {
                    console.log(props);
                    const element = React.createElement(
                        component.component,
                        { ...props, [k]: evt.target.value },
                        props.children
                    );
                    addToSandbox(id, element);
                };
                const settingsId = `${k}-settings`;
                options.push(
                    <React.Fragment key={settingsId}>
                        <label htmlFor={settingsId}>{k}</label>
                        <select id={settingsId} onChange={onChange} value={props[k]}>
                            {v.map(e => <option key={e} value={e}>{e}</option>)}
                        </select>
                    </React.Fragment>
                );
            }
        }
    }
    return options;
}