import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManagementService } from 'src/core/services/user-management.service'; 
import { userStore } from '../userManage.store';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
  providers: [userStore]
})
export class ViewUserComponent implements OnInit{
  userForm: FormGroup = this.fb.group({
    id: '',
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    userName: ["", Validators.required],
    department: ['', [Validators.required]],
    isAdmin: ''
  });
  store = inject(userStore);
  vm$ = this.store.vm$;
  getBoolean = '';

  constructor(
    private userService: UserManagementService,
    private route: ActivatedRoute,
    private router : Router,
    private fb: FormBuilder,
    
  ) {}

ngOnInit(): void {
  console.log(this.userService.getUserData);
  this.store.setAction("Update");
  this.userForm.patchValue(this.userService.getUserData);
  console.log( this.userForm.value.isAdmin)
  this.getBoolean = this.userForm.value.isAdmin;
}

backToHome() {
  this.router.navigate(["/main-user-page/home"]);
}
}
