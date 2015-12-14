import Task from './Task';
import $ from './jquery';
import Util from './Util';

let instance = null;

export default class UI {
  constructor(taskSet) {
    if (!instance) {
      this.taskSet = taskSet;

      this.taskTable = $('#table-of-tasks');
      this.inputPeriod = $('#add-task-period');
      this.inputDuration = $('#add-task-duration');

      $(document).on('click', '#btn-add-task', this.onClickAddTask.bind(this));
      $(document).on('click', '.btn-delete-task', this.onClickDeleteTask.bind(this));
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

  onClickDeleteTask() {
    var id = $(this).data('task');
    this.taskSet.removeTask(id);
  }

  onTaskAdded(t) {
    this.taskTable.find('tbody').append(`<tr id='task-${t.id}'>
      <td>${t.id}</td>
      <td>${t.period}</td>
      <td>${t.duration}</td>
      <td><button class='btn btn-sm btn-danger btn-delete-task' data-task='${t.id}' type="button">delete</button></td>
    </tr>`);
  }

  onTaskDeleted() {
    var id = t.id;
    var row = this.taskTable.find('#task-' + id);
    row.remove();
  }

}
