import { Component, OnInit } from '@angular/core';
import { PaquetesService } from '../paquetes/paquetes.service';

@Component({
  selector: 'app-adeudodoc',
  templateUrl: './adeudodoc.component.html',
  styleUrls: ['./adeudodoc.component.css']
})
export class AdeudodocComponent implements OnInit {

  dataDebts!: any;

  constructor(private pqtSrv: PaquetesService) { }

  ngOnInit(): void {
  }

  obtainDataDebts(type: any) {
    this.pqtSrv.generalDebts(type).subscribe(
      (response: any) => {
        if (response.status == 'OK') {
          this.dataDebts = response.data;
          // console.log(this.dataDebts);
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

