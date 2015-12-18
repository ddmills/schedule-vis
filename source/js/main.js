import TaskSet from './TaskSet';
import Schedule from './Schedule';
import Helper from './Helper';
import RMS from './RMS';
import EDF from './EDF';
import UI from './UI';

let
  tasks = new TaskSet(),
  rms   = new RMS(),
  edf   = new EDF(),
  ui    = new UI(tasks)
;

// rebuild schedules whenever task set changes
tasks.on('change', function() {
  if (tasks.size() > 0) {
    if (rms.check(tasks)) {
      ui.hideError('RMS');
      ui.drawSchedule(rms.build(tasks));
    } else {
      ui.showError('RMS');
    }
    if (edf.check(tasks)) {
      ui.hideError('EDF');
      ui.drawSchedule(edf.build(tasks));
    } else {
      ui.showError('EDF');
    }
  }
});

Helper.populateTaskSet(tasks);
