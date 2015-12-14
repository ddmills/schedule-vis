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
    super.emit('change');
    return t;
  }

  getTask(id) {
    for (var t of this.tasks) {
      if (t.id == id) return t;
    }
    return null;
  }

  utilization() {
    let usage = 0;
    for(var t of this.tasks) {
      usage += t.duration/t.period;
    }
    return usage;
  }

  removeTask(id) {
    var t = this.getTask(id);
    if (t == null) return null;
    var index = this.tasks.indexOf(t);
    this.tasks.splice(index, 1);
    super.emit('task-deleted', t);
    super.emit('change');
    return t;
  }

  size() {
    return this.tasks.length;
  }

  toString() {
    var s = `TaskSet (n=${this.size()}, utilization=${this.utilization()})\n[\n`;
    for (var t of this.tasks) {
      s += `\t ${t.toString()}\n`;
    }
    return s + ']';
  }
}
