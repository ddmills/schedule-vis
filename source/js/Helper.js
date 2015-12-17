import Task from './Task';
import TaskSet from './TaskSet';

exports.populateTaskSet = function(set) {
  set.addTask(new Task(12, 2));
  set.addTask(new Task(6, 1));
  set.addTask(new Task(24, 4));
  set.addTask(new Task(12, 1));
  return set;
}
