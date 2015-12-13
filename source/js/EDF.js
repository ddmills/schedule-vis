/*
 * EDF
 */
import Schedule from './Schedule';

export default class EDF {
  constructor() {

  }

  build(taskset) {



    return new Schedule();
  }

  check(taskset) {
    let upperBound = 1;
    let usage = taskset.utilization();
    return usage <= upperBound;
  }

  toString() {
    return ``;
  }
}
