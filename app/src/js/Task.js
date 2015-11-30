/*
 * Task
 */
export default class Task {
  constructor(start, period, duration) {
    this.start = start;
    this.period = period;
    this.duration = duration;
  }

  toString() {
    return `(${this.start}, ${this.period}, ${this.duration})`;
  }
}
