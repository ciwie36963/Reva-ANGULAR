import { Component, OnInit } from '@angular/core';
import { Group } from '../group/group.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BACKEND_URL } from '../../../../../environments/environment';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  private _group : Group;

  constructor(private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {
    this.route.data.subscribe(item =>   
      this._group = item['group'],
      () => this.router.navigate["**"]
    );
  }
      
  get group() : Group {
      return this._group;
  }
  get imageUrl() {
    return `/API/teachers/image/${this.group.imageString}`
  }
  goBack(){
    this.router.navigate(["/teacher/groups"]);
  }
  imageUrlOfAnswer(answer: string,question:any){
    return `/API/teachers/image/${answer}`;
  }

}
