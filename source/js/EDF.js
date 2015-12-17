/*
 * EDF
 */
import Schedule from './Schedule';
import TaskInstance from './TaskInstance';
import util from './Util';

export default class EDF {
  constructor() { }

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

    taskset.forEach(function(curr, index, arr) {
      countMap[curr.id] = 0;
    });

    for (var t = 0; t < scheduleSize; t++) {
      for (var task of taskset) {
        if((t % task.period) == 0) {
          waiting.push(new TaskInstance(task, countMap[task.id], task.period));
          countMap[task.id] = countMap[task.id] + 1;
        }
      }

      for(var task of waiting) {
        task.start = task.start - 1;
      }

      if(t >= next && waiting.length != 0) {
        let nextTask = waiting[0];
        let nextIndex = 0;
        for (var task of waiting) {
          if(task.start < nextTask.start) {
            nextTask = task;
            nextIndex = waiting.indexOf(task);
          }
        }

        waiting.splice(nextIndex, 1);
        nextTask.start = t;
        instances.push(nextTask);
        next = t + nextTask.task.duration;
      }
    }
    
    return new Schedule("EDF", taskset, scheduleSize, instances);
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
