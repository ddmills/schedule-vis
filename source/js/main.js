import Task from './Task';
import TaskSet from './TaskSet';
import RMS from './RMS';
import EDF from './EDF';
import $ from './jquery';
import check from './InputChecker';

var tasks = new TaskSet();
var rms = new RMS();
var edf = new EDF();

var inputStart = $('#add-task-start');
var inputPeriod = $('#add-task-period');
var inputDuration = $('#add-task-duration');

$(document).on('click', '#btn-add-task', function() {
  inputStart.closest('.form').removeClass('errored');
  inputPeriod.closest('.form').removeClass('errored');
  inputDuration.closest('.form').removeClass('errored');

  var start = inputStart.val();
  var period = inputPeriod.val();
  var duration = inputDuration.val();

  var validStart = check.isPositiveInteger(start);
  var validPeriod = check.isPositiveInteger(period);
  var validDuration = check.isPositiveInteger(duration);

  var error = !validStart || !validPeriod || !validDuration;

  if (!validStart) {
    inputStart.closest('.form').addClass('errored');
  }

  if (!validPeriod) {
    inputPeriod.closest('.form').addClass('errored');
  }

  if (!validDuration) {
    inputDuration.closest('.form').addClass('errored');
  }

  if (!error) {
    var task = new Task(start, period, duration);
    tasks.addTask(task);

    console.log(rms.check(tasks));
    console.log(edf.check(tasks));
  }

});
