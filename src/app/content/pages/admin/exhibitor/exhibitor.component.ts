import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Exhibitor } from './exhibitor.model';
import { AdminDataService } from '../admin-data.service';
import { group } from '@angular/animations';

@Component({
  selector: 'app-exhibitor',
  templateUrl: './exhibitor.component.html',
  styleUrls: ['./exhibitor.component.css']
})
export class ExhibitorComponent implements OnInit {
  @Input() public exhibitor:Exhibitor;
  @Output() public deleteExhibitorEvent = new EventEmitter<Exhibitor>();
  @Output() public modifyExhibitorEvent = new EventEmitter<Exhibitor>();
  constructor() { }

  ngOnInit() {
  }

  deleteExhibitor() {
    this.deleteExhibitorEvent.emit(this.exhibitor);
  }

  modifyExhibitor() {
    this.modifyExhibitorEvent.emit(this.exhibitor);
  }

  showCategory(){
    return this.exhibitor.category.join(", ");
  }
}
