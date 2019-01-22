
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exhibitor } from './exhibitor/exhibitor.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Settings } from './settings.model';


@Injectable({
  providedIn:'root'
})
export class AdminDataService {
  private readonly _appUrl='/API/admin';

  constructor(private http:HttpClient) { }

  get exhibitors():Observable<Exhibitor[]>{
    return this.http.get(`${this._appUrl}/exhibitors`)
    .pipe(map((list:any[]):Exhibitor[]=>list.map(Exhibitor.fromJSON)));
  }

  
  get categories(): Observable<string[]> {
    return this.http
    .get(`${this._appUrl}/categories/`)
    .pipe(map((list: any[]): string[] => list.map(category => category.toString())))
  }

  createExhibitor(exhibitor: Exhibitor):Observable<Exhibitor>{
    return this.http.post(`${this._appUrl}/exhibitor/`,exhibitor)
    .pipe(map(Exhibitor.fromJSON));
  }

  modifyExhibitor(exhibitor){
    return this.http.put(`${this._appUrl}/exhibitor/${exhibitor.id}`,exhibitor)
    .pipe(map(Exhibitor.fromJSON));
  }

  deleteExhibitor(exhibitor){
    return this.http.delete(`${this._appUrl}/exhibitor/${exhibitor.id}`);
  }
  deleteExhibitors(){
    return this.http
      .delete(`${this._appUrl}/removeexhibitors/`);
  }
  deleteGroups() {
    return this.http
      .delete(`${this._appUrl}/removegroups/`);
  }
  
  createCategory(category: string):Observable<string> {
    return this.http.post(`${this._appUrl}/category/`, {name: category})
    .pipe(map(c=>c.toString()));
  }

  deleteCategory(category) {
    return this.http.delete(`${this._appUrl}/category/${category}`)
  }

  modifyCategory(existingCategory, category){
    return this.http.put(`${this._appUrl}/category/${existingCategory}`, {name:category})
    .pipe(map(c=>c.toString()));
  }

  modifySettings(settings: Settings){
    return this.http.put(`${this._appUrl}/settings/`,settings)
    .pipe(map(Settings.fromJSON));
  }

  get settings() : Observable<Settings>{
    return this.http.get(`${this._appUrl}/settings/`)
    .pipe(map(Settings.fromJSON))
  }


}