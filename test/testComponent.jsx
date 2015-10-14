'use strict';

var jsdom = require('mocha-jsdom')
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var assert = require('assert');
var HeHaLoading = require('../');

describe('Loading component', function() {
  
  jsdom();
  var HeHaLoadingInstance = null;
  var props = null;

  beforeEach(function() {
    props = {
      mainTitle: 'foo',
      subTitle: 'bar'
    };
    HeHaLoadingInstance = TestUtils.renderIntoDocument(<HeHaLoading {...props} />);
  });

  it('is a valid React element', function() {
    assert.ok(TestUtils.isElement(<HeHaLoading  {...props} />));
  });

  describe('Component contents', function() {

    it('has an outer loading div', function() {
      assert.ok(TestUtils.findRenderedDOMComponentWithClass(HeHaLoadingInstance, 'heha-loading'));
    });

    it('has an animated icons container', function() {
      assert.ok(TestUtils.findRenderedDOMComponentWithClass(HeHaLoadingInstance, 'icons-animate'));
    });

    it('has a fixed icons container', function() {
      assert.ok(TestUtils.findRenderedDOMComponentWithClass(HeHaLoadingInstance, 'icon-fixed'));
    });
  });
});
