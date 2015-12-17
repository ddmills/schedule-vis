/*
 * Task
 */
//import color from './RandomColor';

export default class Task {
  constructor(period, duration) {
    this.period = period;
    this.duration = duration;
    this.id = -1;
    this.primary = "#900";
    this.secondary = "#F00";
  }

  toString() {
    return `Task (id=${this.id}, period=${this.period}, duration=${this.duration})`;
  }
}
