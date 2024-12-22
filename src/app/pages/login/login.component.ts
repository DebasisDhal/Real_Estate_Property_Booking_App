import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

 userForm: FormGroup = new FormGroup({
  userName: new FormControl('',[Validators.required]),
  password: new FormControl('',[Validators.required,Validators.minLength(3)])
 });

 router = inject(Router)

 onSubmit(){
  const formValue = this.userForm.value;

  if(formValue.userName == 'admin' && formValue.password == '112233'){
    this.router.navigateByUrl('dashboard')
  }else{
    alert("Check your credential")
  }

 }
}
