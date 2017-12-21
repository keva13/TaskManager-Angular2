import {Component, Injectable} from '@angular/core';
import {TasksService} from '../_services/tasks.service';
import {LoginService} from '../_services/login.service';
declare const jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

@Injectable()
export class HomeComponent {

  public tasks: any;

  constructor(public _loginService: LoginService, public _tasksService: TasksService) {
    this.tasks = this._tasksService.tasks;

    this._tasksService.onChangeTask.subscribe((tasks) => {
      this.tasks = tasks;
    })
  }

  changeText(e, task) {
    task.text = e.target.value;

    this._tasksService.editTasks(task, {
      status: task.status,
      text: task.text,
    })
  }

  sortBy(type) {
    if (this._tasksService.sort_field === type) {
      this._tasksService.sort_direction = this._tasksService.sort_direction === 'asc' ? 'desc' : 'asc';
    } else {
      this._tasksService.sort_field = type;
      this._tasksService.sort_direction = 'asc';
    }
    this._tasksService.getTasks();
  }

  changeStatus(e, task) {
    task.status = e.target.value;

    this._tasksService.editTasks(task, {
      status: task.status,
      text: task.text,
    })
  }

  selectPage(number) {
    this._tasksService.page = number;
    this._tasksService.getTasks();
  }

  clearStorage() {
    localStorage.clear();
  }
}
