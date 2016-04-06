import {createElement} from 'react';
import buildBemClassName from './buildBemClassName';
import createBemComponent from './createBemComponent';

export default function bemJsonToReact(json, curBlock, parent) {
    if(json) {
        if(Array.isArray(json)) {
            return json.map(function(item) {
                return bemJsonToReact(item, curBlock, parent);
            });
        }

        if(json.elem) {
            (json.props || (json.props = {}))
                .className = buildBemClassName(json.block || curBlock, json.elem, json.mods, json.mix);

            return createElement(
                json.tag || 'div',
                json.props,
                bemJsonToReact(json.content, curBlock, parent));
        }

        if(json.block) {
            return createBemComponent(json, parent);
        }
    }

    return json;
}
