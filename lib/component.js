'use strict';

var React = require('react');

var HeHaLoading = React.createClass({
  displayName: 'HeHaLoading',

  propTypes: {
    mainTitle: React.PropTypes.string.isRequired,
    subTitle: React.PropTypes.string.isRequired
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'heha-loading' },
      React.createElement(
        'div',
        { className: 'icons-animate' },
        React.createElement('i', { className: 'fa fa-car' }),
        React.createElement('i', { className: 'fa fa-camera-retro' }),
        React.createElement('i', { className: 'fa fa-hotel' }),
        React.createElement('i', { className: 'fa fa-binoculars' }),
        React.createElement('i', { className: 'fa fa-money' }),
        React.createElement('i', { className: 'fa fa-heart' })
      ),
      React.createElement(
        'div',
        { className: 'icon-fixed' },
        React.createElement('i', { className: 'fa fa-suitcase' })
      ),
      React.createElement(
        'h1',
        null,
        this.props.mainTitle
      ),
      React.createElement(
        'h2',
        null,
        this.props.subTitle
      )
    );
  }
});

module.exports = HeHaLoading;