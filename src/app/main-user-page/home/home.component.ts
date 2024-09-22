import { Component, inject } from '@angular/core';
import { UserManagementService } from 'src/core/services/user-management.service';
import { userStore } from '../userManage.store';
import { User } from 'src/core/user.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {v4 as uuid} from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[userStore]
})
export class HomeComponent  {
  store = inject(userStore);
  vm$ = this.store.vm$;

  userForm: FormGroup = this.fb.group({
    id:'',
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    userName: ["", Validators.required],
  })
 
isActive: boolean | undefined;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService : UserManagementService,

  ) {
    this.store.loadUsers();
    
  }

  onSubmit() {
    const user: User = Object.assign(this.userForm.value);
    if(!user.id) {
      user.id = uuid(); 
      this.store.createUser(user);
      this.router.navigate(["/main-user-page/home"]);
    }
    else {
      this.store.updateUser(user);
    }
    this.userForm.reset();
  }

  edit(user: User){
    this.userService.getUserData = user;
    this.router.navigateByUrl('/main-user-page/edit/' + user.id)
  }

  cancel() {
    this.userForm.reset();
    this.store.setAction("Add");
  }

  delete(id: string) {
    this.store.deleteUser(id);
  }

  view(user: User){
    this.userService.getUserData = user;
    this.router.navigateByUrl('/main-user-page/details/' + user.id)
  }

  // ngOnInit() : void {
  //   this.userManagementSerice.currentMessage.subscribe((res) => {
  //     this.message = res;
  //   })
  //   this.getAllUsers();
  // }
  // getAllUsers() {
  //   this.userManagementSerice.getAllUsers().subscribe((data) => {
  //     this.allUsers = data;
  //   })
  // }

  // deleteItem(id: number) {
  //   this.userManagementSerice.deleteUsers(id).subscribe({
  //     next:(data) => {
  //       this.allUsers = this.allUsers.filter(_ => _.id !=id)
  //     },
  //     error:(er) =>{
  //       console.log(er);
  //     }
  //   })
  // }
}


