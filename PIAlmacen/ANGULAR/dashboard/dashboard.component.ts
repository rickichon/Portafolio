import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('btnModal', { static: true }) btnModal: any;
  @ViewChild('closeModalChangePassword', { static: true }) closeModalChangePassword: any;

  session!: string;

  changePasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private dashSrv: DashboardService, private cookieSrv: CookieService) {
    this.createChangePasswordForm();
  }

  ngOnInit(): void {
    this.session = this.cookieSrv.get('resu');
    this.verifyPassword();
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      newPassword: ['', Validators.required]
    });
  }

  verifyPassword() {
    this.dashSrv.verifyPassword(this.session).subscribe(
      (response: any) => {
        if (response && response.status === 'EQUALS') {
          this.btnModal.nativeElement.click();
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }

  changePassword() {
    let newPassword = this.changePasswordForm.get('newPassword')?.value;
    // console.log(newPassword);

    this.dashSrv.changePassword(this.session, newPassword).subscribe(
      (response: any) => {
        if (response.status == 'OK') {
          this.closeModalChangePassword.nativeElement.click();
          alert('La contraseña se ha modificado exitosamente!');
        } else {
          alert('Ha ocurrido un error');
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }

}
