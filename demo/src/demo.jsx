var Component = require('../../lib/component.js');
var React = require('react');
var ReactDOM = require('react-dom');

var props = {
  mainTitle: "MainTitle",
  subTitle: "SubTitle"
};

ReactDOM.render(<Component {...props} />, document.getElementById("example"));
