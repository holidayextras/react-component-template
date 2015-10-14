var Component = require('../../lib/component.js');
var React = require('react');
var ReactDOM = require('react-dom');

var props = {
  message: "I am a demo component"
};

ReactDOM.render(<Component {...props} />, document.getElementById("example"));
