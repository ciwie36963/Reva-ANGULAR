import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AdminDataService } from '../admin-data.service';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  public filterCategoryName: string;
  public filterCategory$=new Subject<string>();
  public errorMsg: string;
  public inputErrorMessage: string;
  public errors=false;
  private _categories: string[];

  private existingCategory: string;

  private edit = false;
  public title = "Toevoegen";
  public btnText = "Voeg categorie toe";
  public name: string = ''

  constructor(private _adminDataService:AdminDataService, private router: Router) {
    this.filterCategory$
    .pipe(
      distinctUntilChanged(),
      debounceTime(400),
      map(val => val.toLowerCase())
    )
    .subscribe(val => (this.filterCategoryName = val));
   }

   ngOnInit():void {
    this._adminDataService.categories.subscribe(
      categories => {this._categories = categories;},
      (error: HttpErrorResponse) => {
        this.errorMsg = `Er is een fout opgetreden bij het laden van de categorieën`;
      }
    );
  }

  get categories(){
    return this._categories;
  }

  removeCategory(category: string) {
    this._adminDataService.deleteCategory(category).subscribe(
      item => (this._categories = this._categories.filter(val => category !== val)),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Kon de categorie ${
          category
        } niet verwijderen.`;
      }
    );
  }
  createCategory(category: string) {
    if (!this.edit) {
      if(category==null) {
        this.inputErrorMessage="Gelieve een naam in te geven!"
        this.errors=true;
      } else {
        this.errors=false;  
        this._adminDataService.createCategory(category).subscribe(
          (categoryR) => {
            this.name = ''
            this.edit = false;
            this.title = "Toevoegen";
            this.categories.push(categoryR)
            this.btnText = "Voeg categorie toe";
            this.router.navigate(["/admin/categorieenbeheren"]);
          },
          (error: HttpErrorResponse) => {
            this.errorMsg = `Error ${error.status} while adding category: ${
              category
              }: ${error.error}`;
          }
        );
      }
  } else {
     this._adminDataService.modifyCategory(this.existingCategory, category).subscribe(
      (categoryR) => {
        this.name = ''
        this.edit = false;
        this.title = "Toevoegen";
        this.btnText = "Voeg categorie toe";
        let index =this.categories.indexOf(this.existingCategory);
        if(~index) 
          this.categories[index]= categoryR;
        this.router.navigate(["/admin/categorieenbeheren"]);
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while adding category: ${
          category
          }: ${error.error}`;
      }
    ); 
  }
  }

  fillForm(categorie: string) {
    this.existingCategory = categorie;
    this.name = categorie;
    this.edit = true;
    this.title = "Aanpassen";
    this.btnText = "Pas categorie aan";
  }

}
