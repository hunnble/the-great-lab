/*global define*/

define([
  'underscore',
  'backbone',
  'models/TaskModel'
], function (_, Backbone, TaskModel) {
  'use strict';

  var Collection = Backbone.Collection.extend({
    model: TaskModel
  });

  return Collection;
});
