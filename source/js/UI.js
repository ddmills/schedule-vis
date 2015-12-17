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
      this.UNITSIZE = 6;

      this.rmsTable = $('#schedule-rms');
      this.edfTable = $('#schedule-edf');
      this.taskTable = $('#table-of-tasks');
      this.inputPeriod = $('#add-task-period');
      this.inputDuration = $('#add-task-duration');
      this.rmsError = $('#error-rms');
      this.edfError = $('#error-edf');

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
      this.inputPeriod.closest('.form').addClass('errored');
    }

    if (!validDuration) {
      this.inputDuration.closest('.form').addClass('errored');
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
    var el = $(`<tr id='task-${task.id}'>
      <td>${task.id}</td>
      <td>${task.period}</td>
      <td>${task.duration}</td>
      <td><button class='btn btn-sm btn-danger btn-delete-task' data-task='${task.id}' type="button">delete</button></td>
    </tr>`);

    el.css('background-color', task.primary);
    el.css('border-color', task.secondary);
    el.css('color', task.tertiary);
    this.taskTable.find('tbody').append(el);
  }

  onTaskDeleted(task) {
    this.taskTable.find('#task-' + task.id).remove();
  }

  onSetChange() {
    $('#set-utilization').html(Util.percent(this.taskSet.utilization()) + '%');
  }

  makeTaskEl(inst) {
    return `<span class='vis-task'>T${inst.task.id}<sub>${inst.num}</sub></span>`;
  }

  drawSchedule(s) {
    var time = s.time;
    var tbl = s.alg == 'RMS' ? this.rmsTable : this.edfTable;
    var set = tbl.find('.vis-task-container');
    var xaxis = tbl.find('.vis-time-container');
    set.html('');
    xaxis.html('');
    if (time <= 0) return;

    for (var inst of s.instances) {
      var w = (inst.task.duration) * this.UNITSIZE;
      var left = inst.start * this.UNITSIZE;
      var el = $(this.makeTaskEl(inst));
      el.css('margin-left', left + '%');
      el.css('background-color', inst.task.primary);
      el.css('border-color', inst.task.secondary);
      el.css('color', inst.task.tertiary);
      el.width(w + '%');
      set.append(el);
    }

    for (var i = 0; i < s.time; i++) {
      var unitvis = $(`<span class='vis-unit' title='t=${i}'>${i}</span>`);
      unitvis.css('margin-left', (this.UNITSIZE * i) + '%');
      unitvis.width(this.UNITSIZE + '%');
      xaxis.append(unitvis);
    }
  }

  hideError(alg) {
    if (alg == 'RMS') {
      this.rmsTable.show();
      this.rmsError.hide();
    } else if (alg == 'EDF') {
      this.edfTable.show();
      this.edfError.hide();
    }
  }

  showError(alg) {
    if (alg == 'RMS') {
      this.rmsTable.hide();
      this.rmsError.show();
    } else if (alg == 'EDF') {
      this.edfTable.hide();
      this.edfError.show();
    }
  }

}
