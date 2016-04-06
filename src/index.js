import createClass from './createClass';
import Component from './Component';

// import ReactBEM from 'react-bem';
// ReactBEM.createClass(…)
// class extends ReactBEM.Component {…}
createClass.createClass = createClass;
createClass.Component = Component;

// import * as ReactBEM from 'react-bem';
// ReactBEM.createClass(…)
// class extends ReactBEM.Component {…}
export default createClass;

// import {createClass, Component} from 'react-bem';
// createClass(…)
// class extends Component {…}
export {createClass, Component};

// var ReactBEM = require('react-bem');
// ReactBEM.createClass(…)
module.exports = createClass;
