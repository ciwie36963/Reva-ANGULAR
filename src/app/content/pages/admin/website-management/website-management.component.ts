import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminDataService } from '../admin-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Settings } from '../settings.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-website-management',
  templateUrl: './website-management.component.html',
  styleUrls: ['./website-management.component.css']
})
export class WebsiteManagementComponent implements OnInit {

  public teacherCodeForm: FormGroup;
  public studentCodeForm: FormGroup;
  public expoDateForm: FormGroup;
  private _settings: Settings;
  public errorMsg : string;
  public groupsDeleted: string;
  public exhibitorsDeleted: string; 
  
  @ViewChild('studentCodeWindow', { read: ElementRef }) studentCodeWindow: ElementRef;
  @ViewChild('studentCodeButton', { read: ElementRef }) studentCodeButton: ElementRef;
  @ViewChild('teacherCodeWindow', { read: ElementRef }) teacherCodeWindow: ElementRef;
  @ViewChild('teacherCodeButton', { read: ElementRef }) teacherCodeButton: ElementRef;
  @ViewChild('expoDateWindow', { read: ElementRef }) expoDateWindow: ElementRef;
  @ViewChild('expoDateButton', { read: ElementRef }) expoDateButton: ElementRef;


  constructor(
    private fb: FormBuilder, private _adminDataService: AdminDataService, private modalService: NgbModal,
  ) { }

  ngOnInit() {

    this._adminDataService.settings.subscribe(
      settings => {this._settings = settings},
      (error: HttpErrorResponse) => {
        this.errorMsg = `Er is een fout opgetreden bij het laden van de instellingen`;
      }
    );

    this.teacherCodeForm = this.fb.group({
      teacherCode: []
    });

    this.studentCodeForm = this.fb.group({
      studentCode: []
    });

    this.expoDateForm = this.fb.group({
      expoDate: []
    });

    

  }



  onSubmit(what: string) {
    switch (what) {
      case "student":
      
        this.settings.studentCode = this.studentCodeForm.value.studentCode;

        this.hideStudentCodeForm()
        break;

      case "teacher":

        this.settings.teacherCode = this.teacherCodeForm.value.teacherCode;

        this.hideTeacherCodeForm()
        break;

      case "date":

        this.settings.expoDate = this.expoDateForm.value.expoDate;

        this.hideExpoDateForm()
        break;

      default:
        break;
    }

    this._adminDataService.modifySettings(this.settings).subscribe();
  }

  showEditForm(which: string) {
    switch (which) {
      case "studentCodeForm":
        this.showStudentCodeForm()

        break;

      case "teacherCodeForm":
        this.showTeacherCodeForm()
        break;

      case "expoDateForm":
        this.showExpoDateForm()
        break;

      default:
        break;
    }


  }


  deleteAllExhibitors() {
    this._adminDataService.deleteExhibitors().subscribe(
      (item) => {
        this.exhibitorsDeleted = " Alle exposanten werden verwijderd.";    
        this.modalService.dismissAll("Remove click");
      },
      () => { }

    );
   
  }

  deleteAllGroups(){
    this._adminDataService.deleteGroups().subscribe(
      (item) => {
        this.groupsDeleted = " Alle groepen werden verwijderd.";    
      },
      () => { }
    );
    this.modalService.dismissAll("Remove click");
  }

  open(content) {
    this.modalService.open(content);
  }

  get settings() : Settings{
    return this._settings;
  }

  

  // UI METHODS
  showStudentCodeForm() {
    this.studentCodeWindow.nativeElement.classList.remove("window-invisible")
    this.studentCodeWindow.nativeElement.classList.add("window-visible")
    this.studentCodeButton.nativeElement.classList.add("window-invisible")
    this.studentCodeButton.nativeElement.classList.remove("window-visible")
  }
  hideStudentCodeForm() {
    this.studentCodeForm.value.studentCode = this.settings.studentCode;
    this.studentCodeWindow.nativeElement.classList.add("window-invisible")
    this.studentCodeWindow.nativeElement.classList.remove("window-visible")
    this.studentCodeButton.nativeElement.classList.add("window-visible")
    this.studentCodeButton.nativeElement.classList.remove("window-invisible")
  }
  showTeacherCodeForm() {
    this.teacherCodeWindow.nativeElement.classList.remove("window-invisible")
    this.teacherCodeWindow.nativeElement.classList.add("window-visible")
    this.teacherCodeButton.nativeElement.classList.add("window-invisible")
    this.teacherCodeButton.nativeElement.classList.remove("window-visible")
  }
  hideTeacherCodeForm() {
    this.teacherCodeForm.value.teacherCode = this.settings.teacherCode;
    this.teacherCodeWindow.nativeElement.classList.add("window-invisible")
    this.teacherCodeWindow.nativeElement.classList.remove("window-visible")
    this.teacherCodeButton.nativeElement.classList.add("window-visible")
    this.teacherCodeButton.nativeElement.classList.remove("window-invisible")
  }
  showExpoDateForm() {
    this.expoDateWindow.nativeElement.classList.remove("window-invisible")
    this.expoDateWindow.nativeElement.classList.add("window-visible")
    this.expoDateButton.nativeElement.classList.add("window-invisible")
    this.expoDateButton.nativeElement.classList.remove("window-visible")
  }
  hideExpoDateForm() {
    this.expoDateForm.value.expoDate = this.settings.expoDate;
    this.expoDateWindow.nativeElement.classList.add("window-invisible")
    this.expoDateWindow.nativeElement.classList.remove("window-visible")
    this.expoDateButton.nativeElement.classList.add("window-visible")
    this.expoDateButton.nativeElement.classList.remove("window-invisible")
  }

}
