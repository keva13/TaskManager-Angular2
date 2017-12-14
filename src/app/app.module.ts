import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { AppConfig } from './app.config';

import { HomeComponent } from './home/home.component';
import { CreateTaskComponent } from './create-task/create-task.component';

import { TasksService } from './_services/tasks.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateTaskComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    AppConfig,
    TasksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
