import Task from './Task';
import TaskSet from './TaskSet';
import RMS from './RMS';
import EDF from './EDF';
import $ from './jquery';
import util from './Util';

var tasks = new TaskSet();
var rms = new RMS();
var edf = new EDF();

var inputStart = $('#add-task-start');
var inputPeriod = $('#add-task-period');
var inputDuration = $('#add-task-duration');
var taskTable = $('#table-of-tasks');

$(document).on('click', '#btn-add-task', function() {
  inputStart.closest('.form').removeClass('errored');
  inputPeriod.closest('.form').removeClass('errored');
  inputDuration.closest('.form').removeClass('errored');

  var start = inputStart.val();
  var period = inputPeriod.val();
  var duration = inputDuration.val();

  var validStart = util.isPositiveInteger(start);
  var validPeriod = util.isPositiveInteger(period) && period > 0;
  var validDuration = util.isPositiveInteger(duration) && duration > 0;

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
    var task = new Task(Number(start), Number(period), Number(duration));
    tasks.addTask(task);
  }
});

tasks.on('change', function() {
  if (tasks.size() > 0) {
    if (rms.check(tasks)) {
      rms.build(tasks);
    }
    if (rms.check(tasks)) {

    }
  }
});

tasks.on('task-added', function(t) {
  taskTable.find('tbody').append(`<tr id='task-${t.id}'>
    <td>${t.id}</td>
    <td>${t.start}</td>
    <td>${t.period}</td>
    <td>${t.duration}</td>
    <td><button class='btn btn-sm btn-danger btn-delete-task' data-task='${t.id}' type="button">delete</button></td>
  </tr>`);
  console.log(tasks.toString());
});

tasks.on('task-deleted', function(t) {
  var id = t.id;
  var row = taskTable.find('#task-' + id);
  row.remove();
});

$(document).on('click', '.btn-delete-task', function() {
  var id = $(this).data('task');
  tasks.removeTask(id);
});
