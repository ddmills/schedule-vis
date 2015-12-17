import Task from './Task';
import TaskSet from './TaskSet';
import Schedule from './Schedule';
import Helper from './Helper';
import RMS from './RMS';
import EDF from './EDF';
import UI from './UI';

var tasks = new TaskSet();
var rms = new RMS();
var edf = new EDF();

var ui = new UI(tasks);

// rebuild schedules whenever task set changes
tasks.on('change', function() {
  if (tasks.size() > 0) {
    if (rms.check(tasks)) {
      var s = rms.build(tasks);
      ui.hideError('RMS');
      ui.drawSchedule(s);
    } else {
      ui.showError('RMS');
    }
    if (edf.check(tasks)) {
      var s = edf.build(tasks);
      console.log(s);
      ui.hideError('EDF');
      ui.drawSchedule(s);
    } else {
      ui.showError('EDF');
    }
  }
});

Helper.populateTaskSet(tasks);
