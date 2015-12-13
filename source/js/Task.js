/*
 * Task
 */
export default class Task {
  constructor(start, period, duration) {
    this.start = start;
    this.period = period;
    this.duration = duration;
    this.id = -1;
  }

  toString() {
    return `Task (id=${this.id}, start=${this.start}, period=${this.period}, duration=${this.duration})`;
  }
}
