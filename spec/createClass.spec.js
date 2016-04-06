import ReactBEM from '../src/';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

describe('createClass', function() {
    it('should return constructor', function() {
        expect(typeof ReactBEM.createClass({
            render: function() {}
        })).toBe('function');
    });

//    "No `render` method …" warn will be shown by ReactCompositeComponentMixin.mountComponent
//    and
//    "TypeError: inst.render is not a function" will be thrown by
//    ReactCompositeComponentMixin._renderValidatedComponentWithoutOwnerOrContext
    it('should throw error if "render" method isn\'t specified', function() {
        expect(function() {
            ReactDOMServer.renderToStaticMarkup(React.createElement(
                ReactBEM.createClass({}),
                {}
            ));
        }).toThrowError(/Class specification must implement a `render` method/);
    });

    it('should throw error if block isn\'t specified in input', function() {
        var InvalidComponent = ReactBEM.createClass({
            render: function() {
                return {
                    foo: 'bat'
                };
            }
        });

        expect(function() {
            ReactDOMServer.renderToStaticMarkup(React.createElement(
                InvalidComponent,
                {}
            ));
        }).toThrowError('render: block should be specified in returned bemjson');
    });
});
