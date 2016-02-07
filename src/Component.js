import React from 'react';
import buildBemClassName from './buildBemClassName';
import bemJsonToReact from './bemJsonToReact';

export default class extends React.Component {
    constructor(props, context) {
        super(props, context);

        if(!this.render) {
//            "No `render` method …" warn will be shown by ReactCompositeComponentMixin.mountComponent
//            and
//            "TypeError: inst.render is not a function" will be thrown by
//            ReactCompositeComponentMixin._renderValidatedComponentWithoutOwnerOrContext
            return;
        }

        let _render = this.render;

        this.render = function() {
            var json = _render.call(this);

            if(!json) {
                throw Error('render: should return bemjson');
            }

            if(!json.block) {
                throw Error('render: block should be specified in returned bemjson');
            }

            if(typeof json.block !== 'string') {
                throw Error('render: block should be a string');
            }

            if(!json.props) {
                json.props = {};
            }

            json.props.className = buildBemClassName(json.block, json.mods, this.props.mix);

            return React.createElement(
                json.tag || 'div',
                json.props,
                bemJsonToReact(json.content, json.block, this)
            );
        };
    }
}
