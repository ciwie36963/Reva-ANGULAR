

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminDataService } from './admin-data.service';
import { ExhibitorComponent } from './exhibitor/exhibitor.component';
import { HttpClientModule } from '@angular/common/http';
import { ExhibitorListComponent } from './exhibitor-list/exhibitor-list.component';
import { AddExhibitorComponent } from './add-exhibitor/add-exhibitor.component';
import { ExhibitorFilterPipe } from './exhibitor-filter.pipe';
import { basehttpInterceptorProviders } from '../../../interceptors';
import { LocaliseExhibitorComponent } from './localise-exhibitor/localise-exhibitor.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category/category.component';
import { WebsiteManagementComponent } from './website-management/website-management.component';
import { CategoryFilterPipe } from './category-filter.pipe';
import { httpInterceptorProviders } from '../../../core/auth/http-interceptors';



const routes = [
  {path:'exposantenbeheren',component:AddExhibitorComponent},
  {path:'exposantenlokaliseren',component:LocaliseExhibitorComponent},
  {path:'categorieenbeheren', component:CategoryListComponent},
  {path:'websitebeheer', component:WebsiteManagementComponent},
  {path:'exposantenlijst',component:ExhibitorListComponent}

];

@NgModule({
  declarations: [
    ExhibitorComponent,ExhibitorFilterPipe, ExhibitorListComponent, AddExhibitorComponent, LocaliseExhibitorComponent,CategoryComponent, CategoryListComponent, WebsiteManagementComponent, CategoryFilterPipe

  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],

  providers: [AdminDataService, basehttpInterceptorProviders,httpInterceptorProviders]
})
export class AdminModule { }
