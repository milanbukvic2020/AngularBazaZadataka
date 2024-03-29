import { TaskComponent } from './../task/task.component' ;
import { Component, OnInit, ViewChild } from '@angular/core' ;
import { DatabaseService } from '../../shared/database.service' ;
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material' ;
import { DepartmentService } from '../../shared/department.service' ;
import { MatDialog, MatDialogConfig } from "@angular/material" ;
import { NotificationService }  from   '../../shared/notification.service' ;

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'   ]
})

export class DisplayComponent implements OnInit  {

  constructor(private service: DatabaseService,
    private departmentService: DepartmentService,
    private dialog: MatDialog ,
    private notificationService: NotificationService ) { }

  listData :   MatTableDataSource<any> ;
  displayedColumns : string[] = ['zadatak','zaposleni', 'kat' , 'pocetakDate', 'zDate', 'opis', 'prior' , 'stanje', 'departmentName', 'actions'];
  @ViewChild( MatSort ) sort: MatSort;
  @ViewChild( MatPaginator ) paginator : MatPaginator ;
  searchKey: string;

  ngOnInit() {
    this.service.getEmployees().subscribe(
      list => {
        let array = list.map(item => {
          let departmentName = this.departmentService.getDepartmentName(item.payload.val()['department']);
          return {
      $key: item.key,
      departmentName,
      ...item.payload.val()
          };
        });

    this.listData = new MatTableDataSource(array);
     this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
        return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };
      });
     }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     dialogConfig.width = "200%";
     dialogConfig.height = "150";
     this.dialog.open(TaskComponent,dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     dialogConfig.width = "200%";
     dialogConfig.height = "150";
     this.dialog.open(TaskComponent,dialogConfig);
  }

  onDelete($key){
    if(confirm('Da li ste sigurni da želite da obrišete zadatak ?')){
     this.service.deleteEmployee($key);
     this.notificationService.warn('! Zadatak je izbrisan iz baze podataka');
    }
  }
}
