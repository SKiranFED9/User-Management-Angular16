import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/core/services/user-management.service';
import { UmUsers } from 'src/core/um-users';
import { userStore } from '../userManage.store';
import { User } from 'src/core/user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [userStore]
})
export class CreateUserComponent {
  store = inject(userStore);
  vm$ = this.store.vm$;
  formData: UmUsers = {
    id: 0,
    firstName: '',
    lastName: '',
    userName: '',
    selectedDepartment: [
      {
        name: ''
      }
    ]
  }

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
  userForm: FormGroup = this.fb.group({
    id: '',
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    userName: ["", Validators.required],
    department: ['', [Validators.required]],
    isAdmin: ''
  });

  constructor(
    private userService: UserManagementService,
    private route: Router,
    private fb: FormBuilder) { }

  checked(e: string) {
    console.log(e);
  }

  // Choose department
  /* eslint-disable @typescript-eslint/no-explicit-any */
  changeDepartment(e : any) {
    console.log(e);
  }

  get department() {
    return this.userForm.get('department');
  }
  onSubmit() {
    const user: User = Object.assign(this.userForm.value);
    if (!user.id) {
      this.store.createUser(user);
      this.route.navigate(["/main-user-page/home"]);
    }
    this.userForm.reset();
  }

  backToHome() {
    this.route.navigate(["/main-user-page/home"]);
  }
}
