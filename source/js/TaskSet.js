/*
 * TaskSet
 */
export default class TaskSet {
  constructor() {
    this.tasks = [];
    this.nextID = 0;
  }

  addTask(t) {
    t.id = this.nextID++;
    this.tasks.push(t);
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
