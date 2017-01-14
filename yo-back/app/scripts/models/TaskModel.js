/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var TaskModel = Backbone.Model.extend({
    initialize: function() {
      this.bind('change', function() {
        console.log('changed');
      });
    },

    defaults: {
      tasks: [],
      filterState: 0
    }
  });

  return TaskModel;
});
