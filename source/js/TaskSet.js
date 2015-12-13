/*
 * TaskSet
 */
import Emitter from './Emitter';

export default class TaskSet extends Emitter {
  constructor() {
    super();
    this.tasks = [];
    this.nextID = 0;
  }

  addTask(t) {
    t.id = this.nextID++;
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
