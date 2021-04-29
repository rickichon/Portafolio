import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @ViewChild('inputSearch', { static: true }) inputSearch: NgForm;

  contentSearch: any;
  id: any = 1;
  aux: Array<any> = []
  zonaComercialId: any = "";
  zonaComercial: any = "";
  zonasComerciales: any = [];
  companys: Array<any> = [];
  zone: any = "";
  setDefault: boolean = false;

  constructor(private route: ActivatedRoute, private storage: Storage, private router: Router, private srchSrv: SearchService) { }

  ngOnInit() {
    this.contentSearch = this.route.snapshot.params['search'];
    this.zone = this.route.snapshot.params['id'];
    this.zonaComercial = this.route.snapshot.params['zone'];
    // console.log("contentSearch", this.contentSearch);
    // console.log("Zone", this.contentSearch);
    this.traerZonas();
    this.setZoneDefault();

  }
  traerZonas() {
    this.srchSrv.zones().subscribe(
      (response) => {
        if (response.estado == 1) {
          this.zonasComerciales = response.data;
          this.search();
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
  }
  setZoneDefault() {
    this.setDefault = true;
    this.zonaComercial = '¿Dónde?';
    this.zonaComercialId = "";
  }
  searchList() {
    if (this.inputSearch.controls.search.value) {
     this.contentSearch = this.inputSearch.controls.search.value;
    }
    if (this.zonaComercialId=="") {
      this.srchSrv.buscador(this.contentSearch).subscribe(
        (response: any) => {
          if (response.estado == 1) {
            this.companys = response.data;
            //this.contentSearch = '';
          } else {
            this.companys = [];
            //this.contentSearch = '';
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.contentSearch = this.contentSearch.replaceAll(' ', "-");
      this.srchSrv.buscadorZona(this.contentSearch, this.zonaComercialId).subscribe(
        (response: any) => {
          if (response.estado === 1) {
            this.companys = response.data;
            //this.contentSearch = '';
          } else {
            this.companys = [];
            //this.contentSearch = '';
          }
        },
        (error) => {
          console.log(error);
        }
      );
      console.log("con zona");
    }
  }

  search() {
    if (!this.route.snapshot.params['search']) {
      this.contentSearch="";
      console.log("errorrs",this.route.snapshot.params['search']);
    }
     if (this.contentSearch=="" && this.zone=="" && this.zonaComercial=="") {
      this.srchSrv.findAll().subscribe(
        (response) => {
          if (response.estado === 1) {
            this.companys = response.data;
            //this.contentSearch = '';
          } else {
            this.companys = [];
            //this.contentSearch = '';
          }
        }, (error) => {
          console.log(error);
        }
      );
    }
    if (this.contentSearch == "" && this.zone) {
      //this.zone = this.zone.replaceAll(' ', "-");
      this.srchSrv.buscadorSoloZona(this.zone).subscribe(
        (response: any) => {
          if (response.estado === 1) {
            this.companys = response.data;
            //this.contentSearch = '';
          } else {
            this.companys = [];
            //this.contentSearch = '';
          }
        },
        (error) => {
          console.log(error);
        }
      );
      console.log("con zona");
    } else {
      if (this.zone == "" && this.contentSearch != "") {
        this.srchSrv.buscador(this.contentSearch).subscribe(
          (response: any) => {
            if (response.estado == 1) {
              this.companys = response.data;
              //this.contentSearch = '';
            } else {
              this.companys = [];
              //this.contentSearch = '';
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.contentSearch = this.contentSearch.replaceAll(' ', "-");
        if (this.zone) {
          this.srchSrv.buscadorZona(this.contentSearch, this.zone).subscribe(
            (response: any) => {
              if (response.estado === 1) {
                this.companys = response.data;
                //this.contentSearch = '';
              } else {
                this.companys = [];
                //this.contentSearch = '';
              }
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          this.srchSrv.buscador(this.contentSearch).subscribe(
            (response: any) => {
              if (response.estado == 1) {
                this.companys = response.data;
                //this.contentSearch = '';
              } else {
                this.companys = [];
                //this.contentSearch = '';
              }
            },
            (error) => {
              console.log(error);
            }
          );

        }

      }
    }
  }

  goToDetail(id, name) {
    name = name.replaceAll(' ', "-");
    this.router.navigate(['tabs/detalle-negocio/' + id + '/' + name]); /*+ '/' + this.contentSearch]);*/
  }

  goToCatalog() {
    this.router.navigate(['tabs/tab3']);
  }

  setZone(item?) {
    console.log(item);
    this.zonaComercial = item.ComercialZone.name;
    console.log("LEL", this.zonaComercial);
    this.zonaComercialId = item.ComercialZone.id;
  }

}
