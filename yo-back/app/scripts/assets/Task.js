define([], function() {
    'use strict';

    var Task = function(title) {
      this.title = title;
      // state: 任务是否完成 0为未完成 1为已完成
      this.state = 0;
    };

    Task.prototype.getTitle = function() {
      return this.title;
    };

    Task.prototype.setTitle = function(newTitle) {
      this.title = newTitle;
    };

    Task.prototype.done = function() {
      this.state = 1;
    };

    Task.prototype.undone = function() {
      this.state = 0;
    };

    return Task;
});
