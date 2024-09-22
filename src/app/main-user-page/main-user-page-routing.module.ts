import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  {
    path:'main-user-page/home',
    component: HomeComponent
  },
  {
    path:'main-user-page',
    redirectTo:'main-user-page/home',
    pathMatch:'full'
  },
  {
    path:'',
    redirectTo:'main-user-page/home',
    pathMatch:'full'
  },
  {
    path:'main-user-page/create',
    component: CreateUserComponent
  },
  {
    path:'main-user-page/edit/:id',
    component: EditUserComponent
  },
  {
    path:'main-user-page/details/:id',
    component: ViewUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainUserPageRoutingModule { }
