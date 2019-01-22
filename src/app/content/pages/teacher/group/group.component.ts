import { Component, OnInit } from '@angular/core';
import { Group } from './group.model';
import { Input } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TeacherDataService } from '../teacher-data.service';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { BACKEND_URL } from '../../../../../environments/environment';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  @Input() public group : Group;
  @Output() public deleteGroupEvent = new EventEmitter<Group>();
  faTimes = faTimes;
  constructor(private _teacherDataService : TeacherDataService, private router : Router) { }

  ngOnInit() {
  }
  deleteGroup() {
    this.deleteGroupEvent.emit(this.group);
  }
  groupDetail() {
    this.router.navigate([`/teacher/group/${this.group.id}`]);
  }
  get imageUrl() {
    return `/API/teachers/image/${this.group.imageString}`
  }
}
