import ReactBEM from '../src/';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

describe('Component', function() {
    it('should extends React.Component', function() {
        class MyComponent extends ReactBEM.Component {
            render() {}
        }

        const instance = new MyComponent(),
            instanceProto = Object.getPrototypeOf(instance);

        expect(Object.getPrototypeOf(Object.getPrototypeOf(instanceProto)).constructor).toBe(React.Component);
    });

//    "No `render` method …" warn will be shown by ReactCompositeComponentMixin.mountComponent
//    and
//    "TypeError: inst.render is not a function" will be thrown by
//    ReactCompositeComponentMixin._renderValidatedComponentWithoutOwnerOrContext
//    Look for same test in React lib
//    https://github.com/facebook/react/blob/188e8c/src/isomorphic/modern/class/__tests__/ReactES6Class-test.js#L59-L69
    it('should throw error if "render" method isn\'t specified', function() {

        spyOn(console, 'error');
        expect(function() {
            ReactDOMServer.renderToStaticMarkup(React.createElement(
                class Foo extends ReactBEM.Component {},
                {}
            ));
        }).toThrow();

        /* eslint-disable no-console */
        expect(console.error.calls.count()).toBe(1);
        expect(console.error.calls.argsFor(0)[0]).toContain(
          'Warning: Foo(...): No `render` method found on the returned component instance'
        );
    });

    it('should render ReactBEM.Component', function() {
        var Block = class extends ReactBEM.Component {
            render() {
                return {
                    block: 'test',
                    tag: 'span'
                };
            }
        };

        expect(
            ReactDOMServer.renderToStaticMarkup(React.createElement(
                Block,
                {}
            ))
        ).toBe('<span class="test"></span>');
    });

    it('should throw error if block isn\'t specified in input', function() {
        var InvalidComponent = class extends ReactBEM.Component {
            render() {
                return {
                    foo: 'bat'
                };
            }
        };

        expect(function() {
            ReactDOMServer.renderToStaticMarkup(React.createElement(
                InvalidComponent,
                {}
            ));
        }).toThrowError('render: block should be specified in returned bemjson');
    });

    it('should throw error if `render` returnet not a bem-json', function() {
        var InvalidComponent = class extends ReactBEM.Component {
            render() {
                return;
            }
        };

        expect(function() {
            ReactDOMServer.renderToStaticMarkup(React.createElement(
                InvalidComponent,
                {}
            ));
        }).toThrowError('render: should return bemjson');
    });
});
