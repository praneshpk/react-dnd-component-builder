function getChildren(root, key) {
    const wrapper = root.props.children;
    if (!wrapper) {
        return {
            [key]: {
                props: root.props,
                children: root.props.children
            }
        }
    }
    const children = wrapper.props.children;
    if (children && typeof children[0] !== 'string' && !(children[0] instanceof String)) {
        return {
            [key]: {
                props: wrapper.props,
                children: children.map(e => {
                    const k = Object.keys(e)[0];
                    return getChildren(e[k], k.split('_')[0]);
                })
            }
        }
    }
    return {
        [key]: {
            props: wrapper.props,
            children
        }
    }
}
export default function exportSandboxToJSON(sandbox) {
    let json: object[] = [];
    for (const key in sandbox) {
        const jsonKey = key.split('_')[0];
        json.push(getChildren(sandbox[key], jsonKey));
    }
    return JSON.stringify(json, null, 2);
}
export function exportToJSON(element, key) {
    return JSON.stringify(getChildren(element, key));
}