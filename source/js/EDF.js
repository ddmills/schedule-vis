/*
 * EDF
 */
export default class EDF {
  constructor() {

  }

  build(taskset) {

  }

  check(taskset) {
    let n = taskset.size();
    let upperBound = 1;
    let usage = 0;

    for(int i = 0; i < n; i++) {
      let ti = taskset.tasks[i];
      usage += ti.duration/ti.period;
    }

    return usage <= upperBound;
  }

  toString() {
    return ``;
  }
}
