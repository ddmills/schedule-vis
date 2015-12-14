import Task from './Task';
import TaskSet from './TaskSet';
import Schedule from './Schedule';
import Helper from './Helper';
import RMS from './RMS';
import EDF from './EDF';
import UI from './UI';

var tasks = new TaskSet();
var scheduleRMS = new Schedule();
var scheduleEDF = new Schedule();
var rms = new RMS();
var edf = new EDF();

var ui = new UI(tasks);

tasks.on('change', function() {
  if (tasks.size() > 0) {
    if (rms.check(tasks)) {
      scheduleRMS = rms.build(tasks);
    }
    if (edf.check(tasks)) {
      scheduleEDF = edf.build(tasks);
    }
  }
});

Helper.populateTaskSet(tasks);
