import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin = false

  @Input() error: string | null | undefined ;

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
  }

  submit() {
    if(this.form.valid) {
      this.checkLogin();
    }
  }


  checkLogin() {
    (this.loginservice.authenticate(this.form.get('username')?.value,this.form.get('password')?.value).subscribe(
      data => {
        this.router.navigate(['pages'])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
        console.log(error)
        this.error = error.error.message;

      }
    )
    );

  }

}
