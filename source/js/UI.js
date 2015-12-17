/*
 * UI Singleton
 */
import Task from './Task';
import $ from './jquery';
import Util from './Util';

let instance = null;

export default class UI {
  constructor(taskSet) {
    if (!instance) {
      this.taskSet = taskSet;

      this.rmsTable = $('#schedule-rms');
      this.taskTable = $('#table-of-tasks');
      this.inputPeriod = $('#add-task-period');
      this.inputDuration = $('#add-task-duration');

      $(document).on('click', '#btn-add-task', this.onClickAddTask.bind(this));
      $(document).on('click', '.btn-delete-task', this.onClickDeleteTask.bind(this));

      taskSet.on('change', this.onSetChange.bind(this));
      taskSet.on('task-added', this.onTaskAdded.bind(this));
      taskSet.on('task-deleted', this.onTaskDeleted.bind(this));

      instance = this;
    }
    return instance;
  }

  onClickAddTask() {
    this.inputPeriod.closest('.form').removeClass('errored');
    this.inputDuration.closest('.form').removeClass('errored');

    var period = this.inputPeriod.val();
    var duration = this.inputDuration.val();

    var validPeriod = Util.isPositiveInteger(period) && period > 0;
    var validDuration = Util.isPositiveInteger(duration) && duration > 0;

    var error = !validPeriod || !validDuration;

    if (!validPeriod) {
      inputPeriod.closest('.form').addClass('errored');
    }

    if (!validDuration) {
      inputDuration.closest('.form').addClass('errored');
    }

    if (!error) {
      var task = new Task(Number(period), Number(duration));
      this.taskSet.addTask(task);
    }
  }

  onClickDeleteTask(e) {
    var id = $(e.target).data('task');
    this.taskSet.removeTask(id);
  }

  onTaskAdded(task) {
    this.taskTable.find('tbody').append(`<tr id='task-${task.id}'>
      <td>${task.id}</td>
      <td>${task.period}</td>
      <td>${task.duration}</td>
      <td><button class='btn btn-sm btn-danger btn-delete-task' data-task='${task.id}' type="button">delete</button></td>
    </tr>`);
  }

  onTaskDeleted(task) {
    this.taskTable.find('#task-' + task.id).remove();
  }

  onSetChange() {
    // console.log(this.taskSet.toString());
  }


  makeTaskEl(inst) {
    return `<span class='vis-task'>T${inst.task.id}<br>[${inst.num}]</span>`;
  }

  drawSchedule(s) {
    var time = s.time;
    var set = this.rmsTable.find('.vis-task-container');
    var xaxis = this.rmsTable.find('.vis-time-container');
    set.html('');
    xaxis.html('');
    if (time <= 0) return;
    var unit = 100/time;
    for (var inst of s.instances) {
      var w = (inst.task.duration) * unit;
      var left = inst.start * unit;
      var el = $(this.makeTaskEl(inst));
      el.css('margin-left', left + '%');
      el.width(w + '%');
      set.append(el);
    }

    for (var i = 0; i < s.time; i++) {
      var unitvis = $(`<span class='vis-unit' title='t=${i}'>${i}</span>`);
      unitvis.css('margin-left', (unit * i) + '%');
      unitvis.width(unit + '%');
      xaxis.append(unitvis);
    }
  }

}
