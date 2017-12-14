import {Component, Injectable} from '@angular/core';
import {TasksService} from '../_services/tasks.service';
import {Md5} from 'ts-md5/dist/md5';
declare const jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

@Injectable()
export class HomeComponent {

  public tasks: any;

  constructor(public _tasksService: TasksService) {
    this.tasks = this._tasksService.tasks;

    this._tasksService.onChangeTask.subscribe((tasks) => {
      this.tasks = tasks;
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
    const signatureData = {
      status: task.status,
      text: task.text,
      token: 'beejee',
    };

    const signature = Md5.hashStr(jQuery.param( signatureData ));
    this._tasksService.editTasks(task, {
      signature: signature,
      status: task.status
    })
  }

  selectPage(number) {
    this._tasksService.page = number;
    this._tasksService.getTasks();
  }
}
