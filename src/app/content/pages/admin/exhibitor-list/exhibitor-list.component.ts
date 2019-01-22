import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Exhibitor } from '../exhibitor/exhibitor.model';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { AdminDataService } from '../admin-data.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-exhibitor-list',
  templateUrl: './exhibitor-list.component.html',
  styleUrls: ['./exhibitor-list.component.css']
})
export class ExhibitorListComponent implements OnInit {
  public filterExhibitorName: string;
  public filterExhibitor$ = new Subject<string>();
  public errorMsg: string;
  private _exhibitors: Exhibitor[];
  closeResult: string;

  @Output() public modifyExhibitorEvent = new EventEmitter<Exhibitor>();



  constructor(private _adminDataService: AdminDataService) {
    this.filterExhibitor$
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        map(val => val.toLowerCase())
      )
      .subscribe(val => (this.filterExhibitorName = val));
  }

  ngOnInit(): void {
    this._adminDataService.exhibitors.subscribe(
      exhibitors => {this._exhibitors = exhibitors;
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = `Er is een fout opgetreden bij het laden van de exposanten`;
      }
    );
  }

  get exhibitors() {
    return this._exhibitors;
  }

  removeExhibitor(exhibitor : Exhibitor) {
    this._adminDataService.deleteExhibitor(exhibitor).subscribe(
      item => (this._exhibitors = this._exhibitors.filter(val => exhibitor.id !== val.id)),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Er is een fout opgetreden bij het verwijderen van de exposant`;
      }
    );
  }
  editExhibitor(exhibitor: Exhibitor) {
    this.modifyExhibitorEvent.emit(exhibitor);
  }
}

