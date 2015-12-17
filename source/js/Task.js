/*
 * Task
 */
import util from './Util';

export default class Task {
  constructor(period, duration) {
    this.period = period;
    this.duration = duration;
    this.id = -1;
    let colors = util.colorSet();
    this.primary = colors[0];
    this.secondary = colors[1];
    this.tertiary = colors[2];
  }

  toString() {
    return `Task (id=${this.id}, period=${this.period}, duration=${this.duration})`;
  }
}
