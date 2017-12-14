import {Component, ElementRef, Injectable, ViewChild} from '@angular/core';
import { TasksService } from '../_services/tasks.service';
declare const $: any;

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})

@Injectable()
export class CreateTaskComponent {
  public formForCreateTask = {
    username: '',
    email: '',
    text: ''
  };
  public image;
  public imageForPreview;
  public preview = false;

  @ViewChild('form') form: ElementRef;
  constructor(private _tasksService: TasksService) {
  }

  changeFile(event) {
    // this.image = event.srcElement.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageForPreview = reader.result;
    };
    reader.readAsDataURL(event.srcElement.files[0]);
    this.resizeAndUpload(event.srcElement.files[0]);
  }

  Submit() {
    const form = new FormData();
    form.append('username', this.formForCreateTask.username);
    form.append('email', this.formForCreateTask.email);
    form.append('text', this.formForCreateTask.text);
    form.append('image', this.image);
    this._tasksService.createTask(form);
    $('#myModal').modal('hide');
    $('#myModa').find('form')[0].reset();
  }


  resizeAndUpload(file) {
    const self = this;
    const reader = new FileReader();
    reader.onloadend = function() {

      const tempImg = new Image();
      tempImg.src = reader.result;
      tempImg.onload = function() {
        const MAX_WIDTH = 320;
        const MAX_HEIGHT = 240;
        let tempW = tempImg.width;
        let tempH = tempImg.height;
        if (tempW > tempH) {
          if (tempW > MAX_WIDTH) {
            tempH *= MAX_WIDTH / tempW;
            tempW = MAX_WIDTH;
          }
        } else {
          if (tempH > MAX_HEIGHT) {
            tempW *= MAX_HEIGHT / tempH;
            tempH = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = tempW;
        canvas.height = tempH;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(<HTMLCanvasElement> this, 0, 0, tempW, tempH);
        const dataURL = canvas.toDataURL('image/jpeg');
        self.image = self.dataURItoBlob(dataURL);
      }
    };
    reader.readAsDataURL(file);
  }

  dataURItoBlob(dataURI) {
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = decodeURI(dataURI.split(',')[1]);
    }
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type: mimeString});
  }
}
