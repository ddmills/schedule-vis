/*
 * RMS
 */
import util from './Util';
import TaskInstance from './TaskInstance';
import Schedule from './Schedule';

export default class RMS {
  constructor() {

  }

  build(taskset) {
    let periodSet = [];
    taskset.tasks.forEach(function(curr, index, arr) {
      periodSet.push(curr.period);
    });
    let scheduleSize = util.lcmArr(periodSet);
    let instances = [];
    let waiting = [];
    let next = 0;
    let countMap = {};
    taskset = taskset.tasks;
    console.log(taskset);

    for(var task of taskset) {
      /*
      if(task.start == 0) {
        waiting.push(new TaskInstance(task, 0, -1));
      }*/
      countMap[task.id] = 0;
    }

    for (var t = 0; t < scheduleSize; t++) {
      for (var task of taskset) {
        if ((t % (task.start + task.period)) == 0) {
          waiting.push(new TaskInstance(task, countMap[task.id], -1));
          countMap[task.id] = countMap[task.id] + 1;
        }
      }

      if(t > next && waiting.length != 0) {
        let nextTask = waiting[0];
        let nextIndex = 0;
        for (var task of waiting) {
          if (task.task.period < nextTask.task.period) {
            nextTask = task;
            nextIndex = waiting.indexOf(task);
          }
        }
        if(t >= nextTask.task.start) {
          waiting.splice(nextIndex, 1);
          nextTask.start = t;
          instances.push(nextTask);
          next = t + nextTask.task.duration;
        }
      }
    }

    let sched = new Schedule("RMS", taskset, scheduleSize, instances);
    console.log(sched);
    return sched;
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
