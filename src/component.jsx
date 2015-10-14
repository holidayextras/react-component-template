'use strict';

var React = require('react');

var HeHaLoading = React.createClass({
  propTypes: {
    mainTitle: React.PropTypes.string.isRequired,
    subTitle: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div className="heha-loading">
        <div className="icons-animate">
          <i className="fa fa-car"></i>
          <i className="fa fa-camera-retro"></i>
          <i className="fa fa-hotel"></i>
          <i className="fa fa-binoculars"></i>
          <i className="fa fa-money"></i>
          <i className="fa fa-heart"></i>
        </div>
        <div className="icon-fixed">
          <i className="fa fa-suitcase"></i>
        </div>
        <h1>{this.props.mainTitle}</h1>
        <h2>{this.props.subTitle}</h2>
      </div>
    );
  }
});

module.exports = HeHaLoading;
