/*
 * TaskSet
 */
export default class TaskSet {
  constructor() {
    this.tasks = [];
  }

  addTask(t) {
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