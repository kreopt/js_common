export const Template = {
    interpolateVar(string, variable, value) {
        return string.replace(new RegExp(`([^$])\\$\{${variable}\}`, 'g'), `$1${value}`)
    },
    render:function(template, data) {
        let t = (typeof template == typeof '') ? document.getElementById(template) : template;
        if (!(t instanceof HTMLTemplateElement)) {
            throw new Error('invalid template');
        }

        let clone = document.importNode(t.content, true);
        let cached = {};
        for (let selector in data) {
            let [sel, attr] = selector.split('@');
            let node = cached[sel];
            if (!node) {
                if (sel) {
                    node = clone.querySelector(sel);
                    cached[sel] = node;
                }
            }
            if (!attr) {
                node.innerHTML = data[selector];
            } else {
                if (attr.startsWith('#')) {
                    let variable = attr.substr(1);
                    let value = data[selector];
                    if (node) {
                        node.innerHTML = Template.interpolateVar(node.innerHTML, variable, value);
                    } else {
                        for (let i=0; i<clone.childNodes.length; ++i) {
                            let child = clone.childNodes[i];
                            switch (child.nodeType) {
                                case Node.ELEMENT_NODE:
                                    child.innerHTML = Template.interpolateVar(child.innerHTML, variable, value);
                                    break;
                                case Node.TEXT_NODE:
                                    child.nodeValue = Template.interpolateVar(child.nodeValue, variable, value);
                                    break;
                                default:;
                            }
                        }
                        // clone.textContent.replace(new RegExp(`([^$])\\$\{${attr.substr(1)}\}`, 'g'), `$1${data[selector]}`);
                    }
                } else {
                    node.setAttribute(attr, data[selector]);
                }
            }
        }
        return clone;
    }
};
