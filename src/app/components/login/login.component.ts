import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public formGroup: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    
    this.formGroup.addControl("email",this.fb.control('',[Validators.required, Validators.email]));
    this.formGroup.addControl("password",this.fb.control('',[Validators.required,Validators.minLength(8)]));
  }

}
