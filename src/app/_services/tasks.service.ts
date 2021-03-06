import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { AppConfig } from '../app.config';
import { Subject } from 'rxjs/Subject';
import {Md5} from 'ts-md5/dist/md5';
declare const jQuery: any;
declare const toastr: any;

@Injectable()
export class TasksService {
  public developer = 'Yuri_Voluykevich';
  public tasks = [];
  public page = 1;
  public totalPage = [];
  public sort_field = 'id';
  public sort_direction = 'asc';
  public onChangeTask = new Subject();

  constructor(private http: Http,
              private config: AppConfig) {
    this.getTasks();
    toastr.options = {
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    };
  }

  createTask(data): Promise<any> {
    const url = `${this.config.apiUrl}create?developer=${this.developer}`;
    const headers = new Headers({});
    const options = new RequestOptions({ headers });

    return this.http.post(url, data, options)
      .toPromise()
      .then(response => {
        const result = response.json();
        if (result.status === 'ok') {
          this.getTasks();
        } else {
          for (let key in result.message) {
            toastr.error('This is not good!', result.message[key]);
          }
        }

        return result;
      })
      .catch(err => err);
  }

  getTasks(): Promise<any> {
    const data = {
      developer: this.developer,
      sort_field: this.sort_field,
      sort_direction: this.sort_direction,
      page: this.page,
    };

    const url = `${this.config.apiUrl}?${jQuery.param(data)}`;

    return this.http.get(url)
      .toPromise()
      .then(response => {
        const result = response.json();
        if (result.status === 'ok') {
          const totalPage = Math.ceil(result.message.total_task_count / 3) || 1;
          this.totalPage = Array(totalPage).fill(4).map((x, i) => i + 1);
          this.tasks = result.message.tasks;
          this.onChangeTask.next(this.tasks);
        } else {
          for (let key in result.message) {
            toastr.error('This is not good!', result.message[key]);
          }
        }

        return result;
      })
      .catch(err => err);
  }

  editTasks(task, data): Promise<any> {
    const url = `${this.config.apiUrl}edit/${task.id}?developer=${this.developer}`;

    const signatureData = {
      status: task.status,
      text: task.text,
      token: 'beejee',
    };

    const signature = Md5.hashStr(jQuery.param( signatureData ));
    data.signature = signature;
    data.token = 'beejee';

    const form = new FormData();
    form.append('signature', data.signature);
    form.append('status', data.status);
    form.append('text', data.text);
    form.append('token', data.token);
    return this.http.post(url, form)
      .toPromise()
      .then(response => {
        const result = response.json();
        return result;
      })
      .catch(err => err);
  }
}
