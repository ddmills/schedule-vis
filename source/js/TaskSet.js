/*
 * TaskSet
 */
import Emitter from './Emitter';

export default class TaskSet extends Emitter {
  constructor() {
    super();
    this.tasks = [];
  }

  addTask(t) {
    this.tasks.push(t);
    super.emit('task-added', t);
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
  }

  size() {
    return this.tasks.length;
  }

  toString() {
    return ``;
  }
}
