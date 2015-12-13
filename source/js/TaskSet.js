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
    return t;
  }

  removeTask(index) {
    var t = tasks[index];
    this.tasks.splice(index, 1);
    super.emit('task-deleted', t);
    return t;
  }

  size() {
    return this.tasks.length;
  }

  toString() {
    var s = `TaskSet (n=${this.size()})\n[\n`;
    for (var t of this.tasks) {
      s += `\t ${t.toString()}\n`;
    }
    return s + ']';
  }
}
