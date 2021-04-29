import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-detalle-negocio',
  templateUrl: './detalle-negocio.page.html',
  styleUrls: ['./detalle-negocio.page.scss'],
})
export class DetalleNegocioPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  negocioId;
  negocio;
  usuario: any;
  likeCompany: boolean = false;
  saveCompany: boolean = false;
  search: string = '';

  constructor(private companyService: CompanyService, private storage: Storage, private route: ActivatedRoute, private socialSharing: SocialSharing) { }

  ngOnInit() {
    this.negocioId = this.route.snapshot.params['id'];
    this.obtenerNegocioPorId(this.negocioId);
    

    this.storage.get('search').then(
      (val) => {
        this.search = val;
      }
    );
  }

  share() {
    console.log("share");
    this.socialSharing.share(
      this.negocio.Company.name, /*Mensaje (Nombre del negocio)*/
      this.negocio.Company.description, /*Asunto (Descripción del negocio)*/
      '', /*Archivo (Vacio)*/
      // this. /*Url (Url del negocio "/id+nombre+busqueda?")*/
    );
  }

  obtenerNegocioPorId(negocioId) {
    this.companyService.obtenerNegocioPorId(negocioId).subscribe(
      (response) => {
        if (response.estado === 1) {
          this.negocio = response.datos.negocio;
          this.getUser();
         
          console.log(this.negocio);
        }
      },
      (error) => {
        console.log({ error });
      }
    );
  }

  like() {
    if (this.usuario) {
      this.companyService.checkLike(this.negocioId, this.usuario.id).subscribe(
        (response: any) => {
          if (response.estado == 1) {
            this.likeCompany = true;
          }else{
            this.likeCompany = false;
          }
        },
        (error) => {
          console.log({ error });
        }
      );
    }
  }
  save(){
    if (this.usuario) {
      this.companyService.checkSave(this.negocioId, this.usuario.id).subscribe(
        (response: any) => {
          if (response.estado == 1) {
            console.log("Esta guardado");
            this.saveCompany = true;
          }else{
            this.saveCompany = false;
          }
        },
        (error) => {
          console.log({ error });
        }
      );
    }
  }

  saveUserCompany() {
    if (this.usuario) {
      this.companyService.checkSaveCompany(this.negocioId,this.usuario?.id).subscribe(
          (response: any) => {
            if (response.estado == 1) {
              this.saveCompany = true;
            }else{
              this.saveCompany = false;
            }
          },
          (error) => {
            console.log({ error });
          }
      );
    }
    console.log("saveCompany");
  }

  getUser() {
    this.storage.get('user').then(
      (val) => {
          this.usuario = val;
          if (!this.usuario) {
            this.likeCompany=false;
            console.log("FALSE");
          }else{
                this.save(); console.log("TRUE",this.negocio);
            for (let i = 0; i < this.negocio.Like.length; i++) {
              if (this.negocio.Like[i].user_id == this.usuario.id) {
                this.likeCompany = true;
              }
            }
          }
          console.log('Usuario: ', this.usuario);
      }
    );
    
  }
}
