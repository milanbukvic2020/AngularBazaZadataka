import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe) { }

  employeeList: AngularFireList<any>;



form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    zaposleni: new FormControl('', Validators.required),
    zadatak: new FormControl('', Validators.required),
    opis: new FormControl('',Validators.maxLength(100)),
    stanje: new FormControl(''),
    prior: new FormControl(''),
    kat: new FormControl('1'),
    department: new FormControl(0),
    pocetakDate: new FormControl(''),
    zDate: new FormControl(''),

    obavezan: new FormControl(false)
  });


 initializeFormGroup() {
    this.form.setValue({
      $key: null,
      zaposleni: '',
      zadatak: '',
      opis: '',
      stanje: '',
      prior: '',

      kat: '1',
      department: 0,
      pocetakDate: '',
      zDate: '',

      obavezan: false
    });
  }


  getEmployees() {
    this.employeeList =   this.firebase.list('tasks');
    return this.employeeList.snapshotChanges();
  }

  insertEmployee (employee)    {
    this.employeeList.push({
      zaposleni: employee.zaposleni,
      zadatak: employee.zadatak,
       opis: employee.opis,
      stanje: employee.stanje,
      prior: employee.prior,
      kat: employee.kat,
      department: employee.department,
       pocetakDate: employee.pocetakDate == "" ? "" : this.datePipe.transform(employee.pocetakDate, 'yyyy-MM-dd'),
       zDate: employee.zDate == "" ? "" : this.datePipe.transform(employee.zDate, 'yyyy-MM-dd'),
      obavezan: employee.obavezan
    });
  }

  updateEmployee(employee) {
    this.employeeList.update(employee.$key,
      {
        zaposleni: employee.zaposleni,
        zadatak: employee.zadatak ,
        opis: employee.opis,
        stanje: employee.stanje,
        prior: employee.prior,

        kat: employee.kat,
        department: employee.department,
         pocetakDate: employee.pocetakDate == "" ? "" : this.datePipe.transform(employee.pocetakDate, 'yyyy-MM-dd'),
         zDate: employee.zDate == "" ? "" : this.datePipe.transform(employee.zDate, 'yyyy-MM-dd'),
        obavezan: employee.obavezan
      });
  }

  deleteEmployee ($key:string) {
   this.employeeList.remove($key)
   ;
  }

  populateForm (employee)     {
   this.form.setValue(_.omit(employee,'departmentName'));
  }
 }
