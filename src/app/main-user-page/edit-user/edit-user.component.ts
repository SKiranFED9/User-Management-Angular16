import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManagementService } from 'src/core/services/user-management.service';
import { UmUsers } from 'src/core/um-users';
import { User } from 'src/core/user.model';
import { userStore } from '../userManage.store';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  providers: [userStore]
})
export class EditUserComponent implements OnInit {
  Department = [
    {
      id: 1,
      name: "Marketing"
    },
    {
      id: 2,
      name: "Maintainence"
    }
  ]

  formData: UmUsers = {
    id: 0,
    firstName: "",
    lastName: "",
    userName: "",
    selectedDepartment: [
      {
        name: ""
      }
    ]
  }
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
  getId!: string | null;

  constructor(
    private userService: UserManagementService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.userForm.patchValue(this.userService.getUserData);
  }

  ngOnInit(): void {


    this.store.setAction("Update");
    console.log(this.userForm.value);
  }
/* eslint-disable @typescript-eslint/no-explicit-any */
  checked(e: any) {
    console.log(e);
  }
  get department() {
    return this.userForm.get('department');
  }
  // Choose city using select dropdown
  /* eslint-disable @typescript-eslint/no-explicit-any */
  changeDepartment(e: any) {
    console.log(e);
  }

  updateUser() {
    const user: User = Object.assign(this.userForm.value);
    console.log(this.userForm.value);
    this.store.updateUser(user);
    this.router.navigate(["/main-user-page/home"]);
  }

  backToHome() {
    this.router.navigate(["/main-user-page/home"]);
  }
}
