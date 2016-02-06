var ReactBEMDOM = require('react-bem-dom'),
    Dropdown = require('./components/dropdown');

ReactBEMDOM.render(
    { block : Dropdown, props : { content : 'dropdown content' } },
    document.body);
