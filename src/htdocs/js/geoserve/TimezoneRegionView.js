'use strict';

var View = require('mvc/View'),

    Util = require('util/Util');


// Default values to be used by constructor
var _DEFAULTS = {
  header: null,
  noDataMessage: 'Time zone data not available.'
};


/**
 * Class: TimezoneRegionView
 *
 * @param params {object}
 *      Configuration options. See _DEFAULTS for more details
 */
var TimezoneRegionView = function (params) {
  var _this,
      _initialize,

      _header,
      _noDataMessage;


  // Inherit from parent class
  _this = View(params || {});


  /**
   * @constructor
   *
   */
  _initialize = function () {
    var classes;

    params = Util.extend({}, _DEFAULTS, params);

    _header = params.header;
    _noDataMessage = params.noDataMessage;

    classes = _this.el.classList;
    if (!classes.contains('timezone-region-view')) {
      classes.add('timezone-region-view');
    }

    _this.render();
  };

  /**
   * updates the view to reflect the current state of the model
   */
  _this.render = function () {
    var markup,
        properties,
        timeZoneRegions;

    markup = [(_header !== null) ? _header : ''];

    try {
      timeZoneRegions = _this.model.get('regions').timezone;
      properties = timeZoneRegions.features[0].properties;

      markup.push(
        '<dl class="horizontal">' +
          '<dt>Time Zone</dt>' +
            '<dd>' + properties.timezone + '</dd>' +
          '<dt>Standard Offset</dt>' +
            '<dd>' + properties.standardoffset + '</dd>' +
          '<dt>DST Start</dt>' +
            '<dd>' + properties.dststart + '</dd>' +
          '<dt>DST End</dt>' +
            '<dd>' + properties.dstend + '</dd>' +
          '<dt>DST Offset</dt>' +
            '<dd>' + properties.dstoffset + '</dd>' +
        '</dl>'
      );
    } catch (e) {
      markup.push(
        '<p class="alert info">' +
          _noDataMessage +
        '</p>'
      );
    }

    _this.el.innerHTML = markup.join('');
  };

  /**
   * Destroy all the things
   */
  _this.destroy = Util.compose(function () {
    _header = null;
    _noDataMessage = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);


  // Always call the constructor
  _initialize();
  params = null;
  return _this;
};

module.exports = TimezoneRegionView;
