import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TeacherDataService } from '../teacher-data.service';
import { Group } from '../group/group.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { flatMap, distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { Input } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  @Input("amount")
  public amount : number;

  public filterGroupName: string;
  public filterGroup$ = new Subject<string>();
  
  private _groups : Group[];
  public errorMsg : string;
  constructor(private _teacherDataService : TeacherDataService, private router : Router) { 
    this.filterGroup$
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        map(val => val.toLowerCase())
      )
      .subscribe(val => (this.filterGroupName = val));
  }

  ngOnInit(): void {
    this._teacherDataService.groups.subscribe(
      groups => {this._groups = groups;
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = `Er is een fout opgetreden bij het laden van de groepen`;
      }
    );
  }
  get groups() {
    return this._groups;
  }
  createGroups() {
    this._teacherDataService.createGroups(this.amount).subscribe((item) => {this._groups=[...this._groups,...item];  })
  }
  deleteGroups() {
    this._teacherDataService.deleteGroups().subscribe(
      (item) => {
       this._groups = [];
 
      },
      () =>{}
     
    );
   }

   removeGroup(group : Group) {
    this._teacherDataService.deleteGroup(group).subscribe(
      item => (this._groups = this._groups.filter(val => group.id !== val.id)),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Er is een fout opgetreden bij het verwijderen van de groep`;
      }
    );
   }

   copyToClipboard() {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      let codes ="";
      this._groups.forEach(function(group) {
        codes += group.code + " "+ "\r\n";
      })
      e.clipboardData.setData('text/plain', (codes));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
   }
}
