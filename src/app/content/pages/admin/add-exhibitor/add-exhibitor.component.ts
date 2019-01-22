import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Exhibitor } from '../exhibitor/exhibitor.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminDataService } from '../admin-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-exhibitor',
  templateUrl: './add-exhibitor.component.html',
  styleUrls: ['./add-exhibitor.component.css']
})
export class AddExhibitorComponent implements OnInit {
  @Output() public newExhibitor = new EventEmitter<Exhibitor>();
  
  public selectedCategory : string
  private errorMsg: string;
  private _categories : string[]
  public exhibitor: FormGroup;
  public existingExhibitor: Exhibitor;
  
  public edit = false;
  public title = "Toevoegen";
  public btnText = "Voeg exposant toe";

  constructor(
    private fb: FormBuilder,
    private _adminDataService: AdminDataService,
    private router: Router) {

  }
  get categories() {
    return this._categories;
  }

  areThereAnyCategories(){
    if (this.exhibitor.value.category){
      return this.exhibitor.value.category.length > 0;
    }
   return false;   
  }
  
  removeCat(cat) {

    const indexOfCategory = this.exhibitor.value.category.indexOf(cat);
    if (indexOfCategory > -1){
      this.exhibitor.value.category.splice(indexOfCategory,1);
    }

  }
  addCat(selectedCategory) {
    if (this.exhibitor.value.category.indexOf(selectedCategory) == -1){
      this.exhibitor.value.category.push(this.exhibitor.value.selectCat)
    }
  }
  ngOnInit() {
    this._adminDataService.categories.subscribe(
      data => {this._categories = data;},
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
        } while trying to retrieve questions: ${error.error}`;
      }
    );
    this.exhibitor = this.fb.group({
      exhibitorname: ['', [Validators.required, Validators.minLength(2)]],
      category: [[]],
      selectCat: ""
    });
  }

  onSubmit() {
    const exhibitor = new Exhibitor(this.exhibitor.value.exhibitorname, this.exhibitor.value.category);
    if (!this.edit) {
    this._adminDataService.createExhibitor(exhibitor).subscribe(
      () => {
        //Herlaadt de lijst met exposanten bij het toevoegen van een exposant
        this.router.navigateByUrl('/admin/exposantenlijst', {skipLocationChange: true}).then(()=>
        this.router.navigate(["/admin/exposantenbeheren"])); 
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while adding exhibitor: ${
          exhibitor.name
          }: ${error.error}`;
      }
    );
  } else {
    exhibitor.id = this.existingExhibitor.id;
    this._adminDataService.modifyExhibitor(exhibitor).subscribe(
      () => {
        //Herlaadt de lijst met exposanten bij het wijzigen van een exposant
        this.router.navigateByUrl('/admin/exposantenlijst', {skipLocationChange: true}).then(()=>
        this.router.navigate(["/admin/exposantenbeheren"])); 
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while editing exhibitor: ${
          exhibitor.name
          }: ${error.error}`;
      }
    );
  }

  this.exhibitor.reset();
  this.edit = false;
  this.title = "Toevoegen";
  this.btnText = "Voeg exposant toe";
  }

  fillForm(exhibitor : Exhibitor) {
    this.exhibitor = this.fb.group({
      exhibitorname: [exhibitor.name, [Validators.required, Validators.minLength(2)]],
      category: [exhibitor.category],
      selectCat: ""
    });
    this.existingExhibitor = exhibitor;
    this.edit = true;
    this.title = "Aanpassen"
    this.btnText = "Pas exhibitor aan"
  }
}

