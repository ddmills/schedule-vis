/*
 * RMS
 */
import util from "./Util";

export default class RMS {
  constructor() {

  }

  build(taskset) {
    let periodSet = [];
    taskset.tasks.forEach(function(curr, index, arr) {
      periodSet.push(curr.period);
    });
    let scheduleSize = util.lcmArr(periodSet);
    console.log(scheduleSize);
  }

  check(taskset) {
    let n = taskset.size();
    let upperBound = n * (Math.pow(2, (1/n)) - 1);
    let usage = 0;

    for(let i = 0; i < n; i++) {
      let ti = taskset.tasks[i];
      usage += ti.duration/ti.period;
    }

    return usage <= upperBound;
  }

  toString() {
    return ``;
  }
}
