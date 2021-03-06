/*import  jsep from 'jsep';*/

/*export */const Template = {
    interpolateVar(string, variable, value) {
        return string.replace(new RegExp(`([^$])?\\$\{${variable}\}`, 'g'), `$1${value}`)
    },
    interpolateChildren(node, variable, value) {
        // TODO: interpolate inner templates
        // TODO: use outer html for variable substitution
        for (let i=0; i<node.childNodes.length; ++i) {
            let child = node.childNodes[i];
            // Template.interpolateRecursive(child, variable, value);
            if (child.nodeType == Node.ELEMENT_NODE) {
                for (let attr of child.attributes) {
                    child.setAttribute(attr.name, Template.interpolateVar(attr.textContent, variable, value))
                }
            }

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
    },
    resolve(expr, context){
        if ([ExpType.MEMBER_EXP, ExpType.IDENTIFIER].includes(expr.type)) {
            if (expr.type == ExpType.IDENTIFIER) {
                return context[expr.name] || '';
            }
            try {
                let obj = Template.resolve(expr.object, context);
                // TODO: resolver context chain
                return expr.property.type==ExpType.LITERAL?obj[expr.property.value]:Template.resolve(expr.property, obj);
            } catch (e) {
                return '';
            }
        } else {
            return '';
        }
    },
    render:function(template, data) {
        let t = (typeof template == typeof '') ? document.getElementById(template) : template;
        if (!(t instanceof HTMLTemplateElement)) {
            throw new Error('invalid template');
        }

        let clone = document.importNode(t.content, true);
        let cached = {};
        for (let selector in data) {
            if (selector.startsWith('=')) {
                let [sel, attr] = selector.split('@');
                sel = sel.substr(1);
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
                    node.setAttribute(attr, data[selector]);
                }
            } else {
                Template.interpolateChildren(clone, selector, data[selector]);
            }
        }
        return clone;
    }
};
/**

 Template.render(template_id, {
    'variable': 'string value',
    '=.selector': 'innerHTML setter',
    '=.selector@attribute': 'attribute setter'
 })

 */