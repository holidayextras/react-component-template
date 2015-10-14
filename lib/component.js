'use strict';

var React = require('react');

var DemoComponent = React.createClass({
  displayName: 'DemoComponent',

  propTypes: {
    message: React.PropTypes.string.isRequired
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'demoComponent' },
      React.createElement(
        'h1',
        null,
        this.props.message
      ),
      React.createElement(
        'p',
        null,
        'Change my source code in ',
        React.createElement(
          'code',
          null,
          'src/'
        ),
        '.'
      )
    );
  }
});

module.exports = DemoComponent;