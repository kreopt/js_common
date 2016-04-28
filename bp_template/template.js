export const Template = {
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
                node = clone.querySelector(sel);
                cached[sel] = node;
            }
            if (!attr) {
                node.innerHTML = data[selector];
            } else {
                if (attr.startsWith('#')) {
                    node.innerHTML.replace(new RegExp(`([^$])\\$\{${attr.substr(1)}\}`, 'g'), `$1${data[selector]}`);
                } else {
                    node.setAttribute(attr, data[selector]);
                }
            }
        }
        return clone;
    }
};
