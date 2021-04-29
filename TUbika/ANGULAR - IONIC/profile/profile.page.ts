import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private authSrv: AuthService, private router: Router, private storage: Storage) { }

  editProfile: boolean = false;
  usuario: any = { username: 'default', comercial_zone_id: 'default' };
  defaultHref = 'tabs/tab4';
  zonasComerciales: any;

  @ViewChild('udtProfile', { static: false }) udtProfile: NgForm;

  ngOnInit() {
    this.getUser();
    this.comercialZone();
  }
  ionViewWillEnter() {
    this.getUser();
    console.log("Entre perfil");
  }

  goToMyBusiness() {
    if (this.usuario) {
      this.router.navigate(['tabs/my-business/'+this.usuario.id]);
    }else{
       this.router.navigate(['tabs/my-business']);
    }
  }

  goToMyRewards() {
    this.router.navigate(['tabs/my-rewards']);
  }

  goToEditProfile() {
    this.router.navigate(['tabs/profile']);
    this.editProfile = true;
  }
  ionViewWillLeave() {
    console.log("Sali");
  }

  updateProfile() {
    if (this.udtProfile?.valid) {
      let username = this.udtProfile.controls.userName.value;
      let gender = this.udtProfile.controls.gender.value;
      let email = this.udtProfile.controls.email.value;
      let re_password = this.udtProfile.controls.re_password.value;
      let zone = this.udtProfile.controls.zone.value;

      console.log({ username }, { gender }, { email }, { re_password }, { zone });

      this.editProfile = false;

    }
  }
  cerrarSesion(){
    this.storage.remove('user');
    this.storage.set('user', null);
    console.log("Sesion cerrada");
    this.router.navigate(['/tabs/tab1']);
  }
  changeAvatar() {
    this.router.navigate(['/tabs/avatar']);
  }

  comercialZone() {
    this.authSrv.traerZonasComercio().subscribe(
      (response) => {
        if (response.estado === 1) {
          this.zonasComerciales = response.data;
          // console.log("response", this.zonasComerciales);
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
  }

  getUser() {
    this.storage.get('user').then(
      (val) => {
        this.usuario = val;
        // console.log(this.usuario);
        this.defaultHref = 'tabs/tab1';
      }
    );
  }
}
