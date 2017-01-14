/*global define*/

define([
  'jquery',
  'backbone',
  'views/IndexView'
], function ($, Backbone, IndexView) {
  'use strict';

  var IndexRouter = Backbone.Router.extend({
    routes: {
      '': 'index'
    },

    index: function() {
      var view = new IndexView(0);
      view.render();
    }
  });

  return IndexRouter;
});
