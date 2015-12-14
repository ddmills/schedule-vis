/*
 * Task
 */
export default class Task {
  constructor(period, duration) {
    this.period = period;
    this.duration = duration;
    this.id = -1;
  }

  toString() {
    return `Task (id=${this.id}, period=${this.period}, duration=${this.duration})`;
  }
}
