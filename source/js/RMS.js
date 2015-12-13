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
    let usage = taskset.utilization();
    return usage <= upperBound;
  }

  toString() {
    return ``;
  }
}
