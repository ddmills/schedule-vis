import Task from './Task';
import $ from './jquery';
import check from './InputChecker';

var t1 = new Task(0, 2, 1);
var t2 = new Task(0, 4, 1);
var t3 = new Task(0, 7, 1);

console.log(t1.toString());
console.log(t2.toString());
console.log(t3.toString());

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
    tasks.add(task);
  }

});
