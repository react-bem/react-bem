import ReactBEM from '../src/';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

describe('render', function() {

    it('should accept element from bem component json', function() {
        var Block = ReactBEM.createClass({
            render: function() {
                return {
                    block: 'test',
                    tag: 'span'
                };
            }
        });

        expect(
            ReactDOMServer.renderToStaticMarkup(React.createElement(
                Block,
                {}
            ))
        ).toBe('<span class="test"></span>');
    });

    it('should accept React\'s element in bem component json', function() {
        var ReactComponent = React.createClass({
            render: function() {
                return React.createElement('input', this.props);
            }
        });

        var BEMComponent = ReactBEM.createClass({
            render: function() {
                return {
                    block: 'test',
                    tag: 'div',
                    content: React.createElement(ReactComponent, this.props)
                };
            }
        });

        expect(
            ReactDOMServer.renderToStaticMarkup(React.createElement(
                BEMComponent,
                {disabled: true}
            ))
        ).toBe('<div class="test"><input disabled=""/></div>');
    });

    it('should accept nested bem-json components', function() {
        var BEMComponent1 = ReactBEM.createClass({
            render: function() {
                return {
                    block: 'link',
                    tag: 'a',
                    props: {
                        href: 'https://ru.bem.info/'
                    },
                    content: 'b_'
                };
            }
        });

        var BEMComponent2 = ReactBEM.createClass({
            render: function() {
                return {
                    block: 'test',
                    tag: 'div',
                    content: React.createElement(BEMComponent1, this.props)
                };
            }
        });

        expect(
            ReactDOMServer.renderToStaticMarkup(React.createElement(
                BEMComponent2,
                {}
            ))
        ).toBe('<div class="test"><a href="https://ru.bem.info/" class="link">b_</a></div>');
    });
});
