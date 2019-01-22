import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() public category:string;
  @Output() public deleteCategoryEvent = new EventEmitter<string>();
  @Output() public modifyCategoryEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  deleteCategory() {
    this.deleteCategoryEvent.emit(this.category);
  }

  modifyCategory() {
    this.modifyCategoryEvent.emit(this.category);
  }

}
