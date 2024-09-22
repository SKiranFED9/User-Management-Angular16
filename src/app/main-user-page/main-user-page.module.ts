import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MainUserPageRoutingModule } from './main-user-page-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewUserComponent } from './view-user/view-user.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    HomeComponent,
    CreateUserComponent,
    EditUserComponent,
    ViewUserComponent
  ],
  imports: [
    CommonModule,   
    MainUserPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class MainUserPageModule { }
