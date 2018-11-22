import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from "./material/material.module";
import {  ReactiveFormsModule,FormsModule } from "@angular/forms";
import {  BrowserAnimationsModule } from '@angular/platform-browser/animations'
;
import { AngularFireModule } from 'angularfire2';
import {  AngularFireDatabaseModule } from 'angularfire2/database';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from   './tasks/task/task.component';
import {  DatabaseService } from './shared/database.service';
import { environment } from '../environments/environment';
import {  DepartmentService } from   './shared/department.service';
import {  DisplayComponent } from  './tasks/display/display.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
     TaskComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule ,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule ,
     AngularFireDatabaseModule ,
     AngularFireModule.initializeApp(environment.firebaseConfig ) ,
     FormsModule
  ],
  providers: [DatabaseService,DepartmentService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents:[ TaskComponent ]
})
export class AppModule { }
