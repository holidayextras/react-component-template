'use strict';

var React = require('react');

var DemoComponent = React.createClass({
  propTypes: {
    message: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div className="demoComponent">
        <h1>{this.props.message}</h1>
        <p>Change my source code in <code>src/</code>.</p>
      </div>
    );
  }
});

module.exports = DemoComponent;
