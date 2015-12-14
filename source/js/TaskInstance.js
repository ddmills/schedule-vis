/*
 * TaskInstance
 */
export default class TaskInstance {
  constructor(task, num, start) {
    this.start = start;
    this.task = task;
    this.num = num;
  }

  toString() {
    return `TaskInstance (num=${this.num}, start=${this.start}, task=${this.task.toString()})`;
  }
}
