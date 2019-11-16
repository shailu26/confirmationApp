import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId;
  profileCompleted = 0;
  user;
  userForm: FormGroup;
  onGoingRequest = false;
  constructor(
    private activateRoute: ActivatedRoute,
    private _userApi: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        Validators.compose([
          Validators.pattern(
            // tslint:disable-next-line: max-line-length
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ])
      ],
      address: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.userId = this.activateRoute.snapshot.paramMap.get('userId');
    this.onGoingRequest = true;
    this._userApi
      .getUserById(this.userId)
      .toPromise()
      .then((user: any) => {
        this.user = user.userDetails;
        this.initForm();
        this.profileCompleted = this.user.confirmed_email;
      })
      .catch(err => {
        console.log({ err });
        if (err.status === 401) {
          this.router.navigate(['/']);
        }
      });
  }

  initForm() {
    this.userForm.get('firstName').setValue(this.user.first_name);
    this.userForm.get('lastName').setValue(this.user.last_name);
    this.userForm.get('email').setValue(this.user.email);
    this.userForm.get('address').setValue(this.user.address);
    this.onGoingRequest = false;
  }

  updateUser() {
    this.onGoingRequest = true;
    const updatedData = {
      firstName: this.userForm.controls.firstName.value,
      lastName: this.userForm.controls.lastName.value,
      email: this.userForm.controls.email.value,
      address: this.userForm.controls.address.value,
      confirmedEmail: 1
    };
    this._userApi
      .updateUserById(this.user.user_id, updatedData)
      .toPromise()
      .then(res => {
        this.onGoingRequest = false;
        alert('Profile completed Successfully');
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.onGoingRequest = false;
        alert('Something went wrong :(');
        console.log('unable to complete profile');
      });
  }
}
