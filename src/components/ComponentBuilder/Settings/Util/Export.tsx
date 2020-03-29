import { parseKey } from "../../Library/Library";

function getChildren(root, key) {
    const grid = root.props.grid;
    const wrapper = root.props.children;
    if (!wrapper || Array.isArray(wrapper)) {
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
                props: { ...wrapper.props, grid },
                children: children.map(e => {
                    const k = Object.keys(e)[0];
                    return getChildren(e[k], parseKey(k)[0]);
                })
            }
        }
    }
    return {
        [key]: {
            props: { ...wrapper.props, grid },
            children
        }
    }
}
export default function exportSandboxToJSON(sandbox) {
    let json: object[] = [];
    for (const key in sandbox) {
        const jsonKey = parseKey(key)[0];
        json.push(getChildren(sandbox[key], jsonKey));
    }
    return JSON.stringify(json, null, 2);
}
export function exportToJSON(element, key) {
    return JSON.stringify(getChildren(element, key));
}