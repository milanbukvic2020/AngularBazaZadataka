import { Component, OnInit } from '@angular/core';
import {MatDialogRef } from '@angular/material';

import { DatabaseService } from '../../shared/database.service';
import {DepartmentService} from '../../shared/department.service';
import { NotificationService} from '../../shared/notification.service';

@Component({
  selector: 'app-task',
   templateUrl: './task.component.html',
   styleUrls:      ['./task.component.css']
})
export class TaskComponent implements  OnInit {

 constructor(private service:DatabaseService ,
   private departmentService:DepartmentService,
  private notificationService:NotificationService ,
   public dialogRef:MatDialogRef<TaskComponent>)
    { }



ngOnInit(){
  this.service.getEmployees();
  }
onClear() {
  this.service.form.reset();
  this.service.initializeFormGroup();
  this.notificationService.success(':: OBRAZAC JE RESETOVAN');
  }

onSubmit() {
  if (this.service.form.valid) {
  if (!this.service.form.get('$key').value )
  this.service.insertEmployee( this.service.form.value );
  else
  this.service. updateEmployee( this.service.form.value );
  this.service. form. reset();
  this.service. initializeFormGroup();
  this. notificationService. success   (':: USPEŠNO IZMENJENO');
  this.onClose()
      ;
    }
  }
onClose() {
    this.service.form.reset();
   this.service.initializeFormGroup();
   this.dialogRef.close() ;


  }

}
