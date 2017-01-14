/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'models/TaskModel',
  'assets/Task'
], function ($, _, Backbone, JST, TaskModel, Task) {
  'use strict';

  var IndexView = Backbone.View.extend({
    template: JST['app/scripts/templates/index.ejs'],

    el: '#container',

    model: new TaskModel(),

    events: {
      'click .add': 'add',
      'click .remove': 'remove',
      'click .done': 'done',
      'click .undone': 'undone',
      'change .detail': 'changeDetail',
      'click .filter-all': 'filterAll',
      'click .filter-done': 'filterDone',
      'click .filter-undone': 'filterUndone',
      'dblclick .task-title': 'triggerDone'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    },

    validation: {
      tasks: function(tasks) {
        for (var i = 0; i < tasks.length; ++i) {
          if (!tasks[i].title) {
            return false;
          }
        }

        return true;
      }
    },

    add: function() {
      var val = this.$el.find('#input').val();
      var newTask = new Task(val);
      var newTasks = _.clone(this.model.get('tasks')).concat([newTask]);
      if (this.validation.tasks(newTasks)) {
        this.model.set({ tasks: newTasks });
      }
    },

    remove: function(e) {
      var removeIndex = $(e.target).parents('.task-group').attr('data-index');
      var newTasks = _.clone(this.model.get('tasks'));
      newTasks.splice(removeIndex, 1);
      this.model.set({ tasks: newTasks });
    },

    done: function(e) {
      var doneIndex = $(e.target).parents('.task-group').attr('data-index');
      var newTasks = _.clone(this.model.get('tasks'));
      newTasks[doneIndex].done();
      this.model.set({ tasks: newTasks });
      this.model.trigger('change');
    },

    undone: function(e) {
      var undoneIndex = $(e.target).parents('.task-group').attr('data-index');
      var newTasks = _.clone(this.model.get('tasks'));
      newTasks[undoneIndex].undone();
      this.model.set({ tasks: newTasks });
      this.model.trigger('change');
    },

    triggerDone: function(e) {
      var index = $(e.target).parents('.task-group').attr('data-index');
      var newTasks = _.clone(this.model.get('tasks'));
      if (newTasks[index].state === 0) {
        newTasks[index].done();
      } else {
        newTasks[index].undone();
      }
      this.model.set({ tasks: newTasks });
      this.model.trigger('change');
    },

    changeTitle: function(e) {
      var changeTitleIndex = $(e.target).parents('.task-group').attr('data-index');
      var newTasks = _.clone(this.model.get('tasks'));
      newTasks[changeTitleIndex].setTitle($(e.target).val());
      this.model.set({ tasks: newTasks });
    },

    changeFilterState: function(newState) {
      this.model.set({ filterState: newState });
    },

    filterAll: function() {
      this.changeFilterState(0);
    },

    filterDone: function() {
      this.changeFilterState(1);

    },

    filterUndone: function() {
      this.changeFilterState(2);
    }
  });

  return IndexView;
});
